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

    const responseHTML = await axios.get(
      `https://www.gutenberg.org/ebooks/${bookId}`
    );

    const regex =
      /<img class="cover-art" src="(.+)" title="Book Cover" alt="Book Cover" itemprop="image">/g;
    const match = regex.exec(responseHTML.data);
    const cover = match?.[1];

    return { ...metadata, flag, cover };
  }

  static async getCoverById(bookId: string): Promise<string> {
    if (!bookId) throw new Error("Book ID is required");

    const response = await axios.get(
      `https://www.gutenberg.org/ebooks/${bookId}`
    );

    if (response.status !== 200) throw new Error("Book not found");

    const regex =
      /<img class="cover-art" src="(.+)" title="Book Cover" alt="Book Cover" itemprop="image">/g;
    const match = regex.exec(response.data);

    if (!match) throw new Error("Book not found");

    return match[1];
  }
}

export default BookService;
