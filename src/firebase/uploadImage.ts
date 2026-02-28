import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "./firebaseConfig";

/**
 * Upload genérico para Firebase Storage
 */
export async function uploadFileToFirebase(
  file: File,
  path?: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      if (!file) {
        reject(new Error("Arquivo não informado"));
        return;
      }

      // 📁 caminho padrão organizado
      const fileName =
        path || `imagens/${Date.now()}-${file.name.replace(/\s/g, "_")}`;

      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Erro no upload:", error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * 🚀 Upload específico da fachada (RECOMENDADO)
 * Sempre salva no mesmo lugar para sobrescrever
 */
export async function uploadFachada(file: File): Promise<string> {
  return uploadFileToFirebase(file, "site/fachada");
}

/**
 * 🧹 Remove imagem do Firebase pelo URL
 */
export async function deleteImageFromFirebase(
  imageUrl: string
): Promise<void> {
  try {
    if (!imageUrl) return;

    const path = extractPathFromUrl(imageUrl);
    const imageRef = ref(storage, path);

    await deleteObject(imageRef);
    console.log("Imagem removida com sucesso.");
  } catch (error) {
    console.warn("Erro ao remover imagem:", error);
  }
}

/**
 * 🔍 Extrai o caminho interno do Storage a partir da URL
 */
function extractPathFromUrl(url: string): string {
  try {
    const match = decodeURIComponent(url).match(/\/o\/(.*?)\?alt=/);
    if (!match || !match[1]) throw new Error("Caminho inválido");
    return match[1];
  } catch {
    throw new Error("Não foi possível extrair o caminho da imagem.");
  }
}