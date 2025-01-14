import { Parser } from "xml2js";

interface Author {
  name: string;
  birthdate: string;
  deathdate: string;
}

interface Metadata {
  publisher: string;
  issuedDate: string;
  rights: string;
  title: string;
  language: string;
  author: Author;
}

const parseRDF = async (rdfString: string): Promise<Metadata | null> => {
  const parser = new Parser({ explicitArray: false });

  try {
    const result = await parser.parseStringPromise(rdfString);
    const ebook = result["rdf:RDF"]["pgterms:ebook"];
    const metadata: Metadata = {
      publisher: ebook["dcterms:publisher"],
      issuedDate: ebook["dcterms:issued"]["_"],
      rights: ebook["dcterms:rights"],
      title: ebook["dcterms:title"],
      language: ebook["dcterms:language"]["rdf:Description"]["rdf:value"]["_"],
      author: {
        name: ebook["dcterms:creator"]["pgterms:agent"]["pgterms:name"],
        birthdate:
          ebook["dcterms:creator"]["pgterms:agent"]["pgterms:birthdate"]["_"],
        deathdate:
          ebook["dcterms:creator"]["pgterms:agent"]["pgterms:deathdate"]["_"],
      },
    };

    return metadata;
  } catch (error) {
    console.error("Error parsing RDF:", error);
    return null;
  }
};

export default parseRDF;
