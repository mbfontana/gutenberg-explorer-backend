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
      publisher: ebook["dcterms:publisher"] || null,
      issuedDate: ebook["dcterms:issued"]?.["_"] || null,
      rights: ebook["dcterms:rights"] || null,
      title: ebook["dcterms:title"] || null,
      language:
        ebook["dcterms:language"]?.["rdf:Description"]?.["rdf:value"]?.["_"] ||
        null,
      author: {
        name:
          ebook["dcterms:creator"]?.["pgterms:agent"]?.["pgterms:name"] || null,
        birthdate:
          ebook["dcterms:creator"]?.["pgterms:agent"]?.["pgterms:birthdate"]?.[
            "_"
          ] || null,
        deathdate:
          ebook["dcterms:creator"]?.["pgterms:agent"]?.["pgterms:deathdate"]?.[
            "_"
          ] || null,
      },
    };

    return metadata;
  } catch (error) {
    console.error("Error parsing RDF:", error);
    return null;
  }
};

export default parseRDF;
