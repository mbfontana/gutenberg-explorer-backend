import axios from "axios";
import parseRDF from "../utils/parseRDF";
import { countriesFlag, CountryCode } from "../utils/countriesFlag";

class BookService {
  static async getTextById(bookId: string): Promise<string> {
    if (!bookId) throw new Error("Book ID is required");

    const response = await axios.get(
      `https://www.gutenberg.org/files/${bookId}/${bookId}-0.txt`
    );

    if (!response.data) throw new Error("Book not found");

    return response.data;
  }

  static async getMetadataById(bookId: string): Promise<any> {
    if (!bookId) throw new Error("Book ID is required");

    const response = await axios.get(
      `https://www.gutenberg.org/ebooks/${bookId}.rdf`
    );

    if (response.status !== 200) throw new Error("Book not found");

    const metadata = await parseRDF(response.data);

    if (!metadata) throw new Error("Book not found");

    const language = metadata.language as CountryCode;
    const flag = countriesFlag[language];

    return { ...metadata, flag };
  }
}

export default BookService;
