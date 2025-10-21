"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy, FileCode, Folder, FolderOpen } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

const codeFiles = {
  "route.ts": `
import { createMcpHandler } from "@vercel/mcp-adapter";
import { z } from "zod";
import { supabaseTools } from "../../lib/tools/supabase";

const handler = createMcpHandler(
  (server) => {
    // Creator Info Tool
    server.tool(
      "creatorInfo",
      "Get detailed information about Piyush Dhoka - AI/ML Engineer and Developer",
      {},
      async () => ({
        content: [
          {
            type: "text" as const,
            text: "# Piyush Dhoka - AI/ML Engineer & Developer",
          },
        ],
      })
    );

    // Supabase Get Document Tool
    server.tool(
      "getDocument",
      "Get a document by its unique ID from the Supabase database",
      {
        documentId: z
          .string()
          .describe("The unique ID (UUID) of the document to retrieve"),
        tableName: z
          .string()
          .optional()
          .describe("The table name (defaults to 'companies')"),
      },
      async ({ documentId, tableName }) => {
        return await supabaseTools.getDocument.handler({
          documentId,
          tableName,
        });
      }
    );

    // Supabase List Documents Tool
    server.tool(
      "listDocuments",
      "List all documents from a Supabase table with pagination and sorting",
      {
        tableName: z
          .string()
          .optional()
          .describe("The table name (defaults to 'companies')"),
        limit: z
          .number()
          .optional()
          .describe("Maximum number of documents to return (defaults to 25)"),
        offset: z
          .number()
          .optional()
          .describe("Number of records to skip (defaults to 0)"),
        orderBy: z
          .string()
          .optional()
          .describe("Column to order by (defaults to 'created_at')"),
        ascending: z
          .boolean()
          .optional()
          .describe("Sort order (defaults to false for descending)"),
      },
      async ({ tableName, limit, offset, orderBy, ascending }) => {
        return await supabaseTools.listDocuments.handler({
          tableName,
          limit,
          offset,
          orderBy,
          ascending,
        });
      }
    );

    // Supabase Create Document Tool
    server.tool(
      "createDocument",
      "Create a new document in the Supabase database",
      {
        company_name: z.string().describe("The name of the company"),
        company_id: z
          .number()
          .describe("The unique identifier for the company (integer)"),
        description: z.string().optional().describe("Company description"),
        website: z.string().optional().describe("Company website URL"),
        employee_count: z.number().optional().describe("Number of employees"),
        founded_year: z.number().optional().describe("Year the company was founded"),
        industry: z.string().optional().describe("Industry sector"),
        tableName: z
          .string()
          .optional()
          .describe("The table name (defaults to 'companies')"),
      },
      async ({ company_name, company_id, description, website, employee_count, founded_year, industry, tableName }) => {
        return await supabaseTools.createDocument.handler({
          company_name,
          company_id,
          description,
          website,
          employee_count,
          founded_year,
          industry,
          tableName,
        });
      }
    );

    // Supabase Update Document Tool
    server.tool(
      "updateDocument",
      "Update an existing document in the Supabase database",
      {
        documentId: z
          .string()
          .describe("The unique ID (UUID) of the document to update"),
        company_name: z.string().optional().describe("The name of the company"),
        company_id: z.number().optional().describe("The unique identifier"),
        description: z.string().optional().describe("Company description"),
        website: z.string().optional().describe("Company website URL"),
        employee_count: z.number().optional().describe("Number of employees"),
        founded_year: z.number().optional().describe("Year founded"),
        industry: z.string().optional().describe("Industry sector"),
        tableName: z
          .string()
          .optional()
          .describe("The table name (defaults to 'companies')"),
      },
      async ({ documentId, company_name, company_id, description, website, employee_count, founded_year, industry, tableName }) => {
        return await supabaseTools.updateDocument.handler({
          documentId,
          company_name,
          company_id,
          description,
          website,
          employee_count,
          founded_year,
          industry,
          tableName,
        });
      }
    );

    // Supabase Delete Document Tool
    server.tool(
      "deleteDocument",
      "Delete a document from the Supabase database",
      {
        documentId: z
          .string()
          .describe("The unique ID (UUID) of the document to delete"),
        tableName: z
          .string()
          .optional()
          .describe("The table name (defaults to 'companies')"),
      },
      async ({ documentId, tableName }) => {
        return await supabaseTools.deleteDocument.handler({
          documentId,
          tableName,
        });
      }
    );

    // Supabase Upsert Document Tool
    server.tool(
      "upsertDocument",
      "Create or update a document in the Supabase database (upsert operation)",
      {
        company_name: z.string().describe("The name of the company"),
        company_id: z.number().describe("The unique identifier for the company"),
        description: z.string().optional().describe("Company description"),
        website: z.string().optional().describe("Company website URL"),
        employee_count: z.number().optional().describe("Number of employees"),
        founded_year: z.number().optional().describe("Year founded"),
        industry: z.string().optional().describe("Industry sector"),
        tableName: z
          .string()
          .optional()
          .describe("The table name (defaults to 'companies')"),
      },
      async ({ company_name, company_id, description, website, employee_count, founded_year, industry, tableName }) => {
        return await supabaseTools.upsertDocument.handler({
          company_name,
          company_id,
          description,
          website,
          employee_count,
          founded_year,
          industry,
          tableName,
        });
      }
    );

    // Supabase Clear Collection Tool
    server.tool(
      "clearCollection",
      "Delete all documents from a Supabase table (use with caution!)",
      {
        tableName: z
          .string()
          .optional()
          .describe("The table name (defaults to 'companies')"),
        confirm: z
          .boolean()
          .describe("Must be set to true to confirm deletion of all records"),
      },
      async ({ tableName, confirm }) => {
        return await supabaseTools.clearCollection.handler({
          tableName,
          confirm,
        });
      }
    );
  },
  {
    capabilities: {
      tools: {
        creatorInfo: {
          description:
            "Get detailed information about Piyush Dhoka - AI/ML Engineer",
        },
        getDocument: {
          description:
            "Get a document by its unique ID from the Supabase database",
        },
        listDocuments: {
          description: "List all documents from a Supabase table with pagination and sorting",
        },
        createDocument: {
          description: "Create a new document in the Supabase database.",
        },
        updateDocument: {
          description: "Update an existing document in the Supabase database",
        },
        deleteDocument: {
          description: "Delete a document from the Supabase database",
        },
        upsertDocument: {
          description:
            "Create or update a document in the Supabase database (upsert operation)",
        },
        clearCollection: {
          description:
            "Delete all documents from a Supabase table (use with caution!)",
        },
      },
    },
  },
  {
    sseEndpoint: "/sse",
    streamableHttpEndpoint: "/mcp",
    verboseLogs: true,
    maxDuration: 60,
  }
);

export { handler as GET, handler as POST, handler as DELETE };

  `,

  "supabase.ts": `import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export const supabaseTools = {
  // Supabase Get Document Tool
  getDocument: {
    name: "getDocument",
    description: "Get a document by its unique ID from the Appwrite database",
    schema: {
      documentId: z
        .string()
        .describe("The unique ID of the document to retrieve"),
      collectionId: z
        .string()
        .optional()
        .describe("The collection ID (defaults to 'company_names')"),
    },
    handler: async ({
      documentId,
      collectionId = "company_names",
    }: {
      documentId: string;
      collectionId?: string;
    }) => {
      try {
        if (!DATABASE_ID) {
          throw new Error("DATABASE_ID environment variable is not set");
        }

        console.log(
          "Fetching document with ID: " + documentId + " from collection: " + collectionId
        );

        const document = await databases.getDocument(
          DATABASE_ID,
          collectionId,
          documentId
        );

        console.log("Document retrieved successfully:", document);

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  success: true,
                  document: {
                    id: document.$id,
                    createdAt: document.$createdAt,
                    updatedAt: document.$updatedAt,
                    company_name: document.company_name,
                    company_id: document.company_id,
                  },
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        console.error("Error fetching document:", error);

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  success: false,
                  error:
                    error instanceof Error
                      ? error.message
                      : "Unknown error occurred",
                },
                null,
                2
              ),
            },
          ],
        };
      }
    },
  },

  // Appwrite List Documents Tool
  listDocuments: {
    name: "listDocuments",
    description: "List all documents from the companies collection",
    schema: {
      collectionId: z
        .string()
        .optional()
        .describe("The collection ID (defaults to 'company_names')"),
      limit: z
        .number()
        .optional()
        .describe("Maximum number of documents to return (defaults to 25)"),
    },
    handler: async ({
      collectionId = "company_names",
      limit = 25,
    }: {
      collectionId?: string;
      limit?: number;
    }) => {
      try {
        if (!DATABASE_ID) {
          throw new Error("DATABASE_ID environment variable is not set");
        }

        console.log(
          "Listing documents from collection: " + collectionId + " with limit: " + limit
        );

        const documents = await databases.listDocuments(
          DATABASE_ID,
          collectionId,
          []
        );

        console.log("Retrieved " + documents.documents.length + " documents");

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  success: true,
                  total: documents.total,
                  documents: documents.documents.map((doc) => ({
                    id: doc.$id,
                    createdAt: doc.$createdAt,
                    updatedAt: doc.$updatedAt,
                    company_name: doc.company_name,
                    company_id: doc.company_id,
                  })),
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        console.error("Error listing documents:", error);

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  success: false,
                  error:
                    error instanceof Error
                      ? error.message
                      : "Unknown error occurred",
                },
                null,
                2
              ),
            },
          ],
        };
      }
    },
  },

  // Appwrite Create Document Tool
  createDocument: {
    name: "createDocument",
    description: "Create a new document in the Appwrite database",
    schema: {
      company_name: z.string().describe("The name of the company"),
      company_id: z
        .number()
        .describe("The unique identifier for the company (integer)"),
      documentId: z
        .string()
        .optional()
        .describe(
          "Optional custom document ID (auto-generated if not provided)"
        ),
      collectionId: z
        .string()
        .optional()
        .describe("The collection ID (defaults to 'company_names')"),
    },
    handler: async ({
      company_name,
      company_id,
      documentId,
      collectionId = "company_names",
    }: {
      company_name: string;
      company_id: number;
      documentId?: string;
      collectionId?: string;
    }) => {
      try {
        if (!DATABASE_ID) {
          throw new Error("DATABASE_ID environment variable is not set");
        }

        console.log(
          "Creating document in collection: " + collectionId + " with data:"
        );
        console.log({ company_name, company_id });

        const document = await databases.createDocument(
          DATABASE_ID,
          collectionId,
          documentId || "unique()", // Use provided ID or auto-generate
          {
            company_name,
            company_id,
          }
        );

        console.log("Document created successfully:", document);

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  success: true,
                  message: "Document created successfully",
                  document: {
                    id: document.$id,
                    createdAt: document.$createdAt,
                    updatedAt: document.$updatedAt,
                    company_name: document.company_name,
                    company_id: document.company_id,
                  },
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        console.error("Error creating document:", error);

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  success: false,
                  error:
                    error instanceof Error
                      ? error.message
                      : "Unknown error occurred",
                },
                null,
                2
              ),
            },
          ],
        };
      }
    },
  },

  // Appwrite Update Document Tool
  updateDocument: {
    name: "updateDocument",
    description: "Update an existing document in the Appwrite database",
    schema: {
      documentId: z
        .string()
        .describe("The unique ID of the document to update"),
      company_name: z
        .string()
        .optional()
        .describe("The name of the company (optional)"),
      company_id: z
        .number()
        .optional()
        .describe("The unique identifier for the company (optional integer)"),
      collectionId: z
        .string()
        .optional()
        .describe("The collection ID (defaults to 'company_names')"),
    },
    handler: async ({
      documentId,
      company_name,
      company_id,
      collectionId = "company_names",
    }: {
  documentId: string;
      company_name?: string;
      company_id?: number;
      collectionId?: string;
    }) => {
      try {
        if (!DATABASE_ID) {
          throw new Error("DATABASE_ID environment variable is not set");
        }

        const updateData: Record<string, string | number> = {};
        if (company_name !== undefined) updateData.company_name = company_name;
        if (company_id !== undefined) updateData.company_id = company_id;

        if (Object.keys(updateData).length === 0) {
          throw new Error("At least one field must be provided for update");
        }

        console.log(
          "Updating document with ID: " + documentId + " in collection: " + collectionId + " with data:"
        );
        console.log(updateData);

        const document = await databases.updateDocument(
          DATABASE_ID,
          collectionId,
          documentId,
          updateData
        );

        console.log("Document updated successfully:", document);

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  success: true,
                  message: "Document updated successfully",
                  document: {
                    id: document.$id,
                    createdAt: document.$createdAt,
                    updatedAt: document.$updatedAt,
                    company_name: document.company_name,
                    company_id: document.company_id,
                  },
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        console.error("Error updating document:", error);

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  success: false,
                  error:
                    error instanceof Error
                      ? error.message
                      : "Unknown error occurred",
                },
                null,
                2
              ),
            },
          ],
        };
      }
    },
  },

  // Appwrite Delete Document Tool
  deleteDocument: {
    name: "deleteDocument",
    description: "Delete a document from the Appwrite database",
    schema: {
      documentId: z
        .string()
        .describe("The unique ID of the document to delete"),
      collectionId: z
        .string()
        .optional()
        .describe("The collection ID (defaults to 'company_names')"),
    },
    handler: async ({
      documentId,
      collectionId = "company_names",
    }: {
      documentId: string;
      collectionId?: string;
    }) => {
      try {
        if (!DATABASE_ID) {
          throw new Error("DATABASE_ID environment variable is not set");
        }

        console.log(
          "Deleting document with ID: " + documentId + " from collection: " + collectionId
        );

        await databases.deleteDocument(DATABASE_ID, collectionId, documentId);

        console.log("Document deleted successfully");

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  success: true,
                  message: "Document deleted successfully",
                  deletedDocumentId: documentId,
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        console.error("Error deleting document:", error);

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  success: false,
                  error:
                    error instanceof Error
                      ? error.message
                      : "Unknown error occurred",
                },
                null,
                2
              ),
            },
          ],
        };
      }
    },
  },

  // Appwrite Upsert Document Tool
  upsertDocument: {
    name: "upsertDocument",
    description:
      "Create or update a document in the Appwrite database (upsert operation)",
    schema: {
      documentId: z
        .string()
        .describe("The unique ID of the document to create or update"),
      company_name: z.string().describe("The name of the company"),
      company_id: z
        .number()
        .describe("The unique identifier for the company (integer)"),
      collectionId: z
        .string()
        .optional()
        .describe("The collection ID (defaults to 'company_names')"),
    },
    handler: async ({
      documentId,
      company_name,
      company_id,
      collectionId = "company_names",
    }: {
      documentId: string;
      company_name: string;
      company_id: number;
      collectionId?: string;
    }) => {
      try {
        if (!DATABASE_ID) {
          throw new Error("DATABASE_ID environment variable is not set");
        }

        console.log(
          "Attempting upsert for document with ID: " + documentId + " in collection: " + collectionId
        );

        let document;
        let operation = "";

        try {
          await databases.getDocument(DATABASE_ID, collectionId, documentId);

          document = await databases.updateDocument(
            DATABASE_ID,
            collectionId,
            documentId,
            {
              company_name,
              company_id,
            }
          );
          operation = "updated";
          console.log("Document updated successfully:", document);
        } catch {
          document = await databases.createDocument(
            DATABASE_ID,
            collectionId,
            documentId,
            {
              company_name,
              company_id,
            }
          );
          operation = "created";
          console.log("Document created successfully:", document);
        }

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  success: true,
                  message: operation + " successfully",
                  operation,
                  document: {
                    id: document.$id,
                    createdAt: document.$createdAt,
                    updatedAt: document.$updatedAt,
                    company_name: document.company_name,
                    company_id: document.company_id,
                  },
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        console.error("Error during upsert operation:", error);

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  success: false,
                  error:
                    error instanceof Error
                      ? error.message
                      : "Unknown error occurred",
                },
                null,
                2
              ),
            },
          ],
        };
      }
    },
  },
};`,

  "package.json": `{
  "name": "supabase-mcp-server",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@hookform/resolvers": "^5.0.1",
    "@modelcontextprotocol/sdk": "^1.12.1",
    "@radix-ui/react-accordion": "^1.2.11",
    "@radix-ui/react-alert-dialog": "^1.1.14",
    "@radix-ui/react-aspect-ratio": "^1.1.7",
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-checkbox": "^1.3.2",
    "@radix-ui/react-collapsible": "^1.1.11",
    "@radix-ui/react-context-menu": "^2.2.15",
    "@radix-ui/react-dialog": "^1.1.14",
    "@radix-ui/react-dropdown-menu": "^2.1.15",
    "@radix-ui/react-hover-card": "^1.1.14",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-menubar": "^1.1.15",
    "@radix-ui/react-navigation-menu": "^1.2.13",
    "@radix-ui/react-popover": "^1.1.14",
    "@radix-ui/react-progress": "^1.1.7",
    "@radix-ui/react-radio-group": "^1.3.7",
    "@radix-ui/react-scroll-area": "^1.2.9",
    "@radix-ui/react-select": "^2.2.5",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slider": "^1.3.5",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.2.5",
    "@radix-ui/react-tabs": "^1.1.12",
    "@radix-ui/react-toggle": "^1.1.9",
    "@radix-ui/react-toggle-group": "^1.1.10",
    "@radix-ui/react-tooltip": "^1.2.7",
    "@vercel/mcp-adapter": "^0.7.3",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "date-fns": "^4.1.0",
    "embla-carousel-react": "^8.6.0",
    "input-otp": "^1.4.2",
    "lucide-react": "^0.511.0",
    "motion": "^12.15.0",
    "next": "15.3.3",
    "next-themes": "^0.4.6",
    "node-appwrite": "^17.0.0",
    "react": "^19.0.0",
    "react-day-picker": "8.10.1",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.56.4",
    "react-resizable-panels": "^3.0.2",
    "recharts": "^2.15.3",
    "shiki": "^3.4.2",
    "sonner": "^2.0.3",
    "tailwind-merge": "^3.3.0",
    "vaul": "^1.1.2",
    "zod": "^3.25.42"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "15.3.3",
    "tailwindcss": "^4",
    "tw-animate-css": "^1.3.2",
    "typescript": "^5"
  }
}`,
};

const fileStructure = [
  { name: "src", type: "folder", level: 0, expanded: true },
  { name: "route.ts", type: "file", level: 0 },
  { name: "supabase.ts", type: "file", level: 0 },
  { name: "package.json", type: "file", level: 0 },
];

export default function CodeShowcase() {
  const [copied, setCopied] = useState("");
  const [expandedFolders, setExpandedFolders] = useState(
    new Set(["src", "[transport]", "lib", "tools", "examples", "config"])
  );
  const [selectedFile, setSelectedFile] = useState("route.ts");

  const copyCode = (fileName: string) => {
    navigator.clipboard.writeText(
      codeFiles[fileName as keyof typeof codeFiles]
    );
    setCopied(fileName);
    setTimeout(() => setCopied(""), 2000);
  };

  const toggleFolder = (folderName: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderName)) {
      newExpanded.delete(folderName);
    } else {
      newExpanded.add(folderName);
    }
    setExpandedFolders(newExpanded);
  };

  const getFileFromPath = (path: string) => {
    if (path.includes("/")) {
      return path.split("/").pop() || path;
    }
    return path;
  };

  // Helper function to build file path based on structure
  const buildFilePath = (
    currentIndex: number,
    item: { type: string; level: number; name: string }
  ) => {
    if (item.type === "folder") return item.name;

    if (item.level === 0) return item.name;

    const pathParts = [];
    let currentLevel = item.level;

    // Build path from current item backwards through parent folders
    for (let i = currentIndex - 1; i >= 0 && currentLevel > 0; i--) {
      const parentItem = fileStructure[i];
      if (
        parentItem.type === "folder" &&
        parentItem.level === currentLevel - 1
      ) {
        pathParts.unshift(parentItem.name);
        currentLevel--;
      }
    }

    pathParts.push(item.name);
    return pathParts.join("/");
  };

  return (
    <section className="container mx-auto px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <Badge
          variant="outline"
          className="mb-4 border-slate-700 text-slate-300"
        >
          Source Code
        </Badge>
        <h2 className="text-4xl font-bold text-white mb-4">
          Sneak Peek into the Code
        </h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Here&apos;s a sneak peek into the code that powers the MCP Server.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="lg:col-span-1 order-2 lg:order-1"
        >
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm h-full">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2 text-lg">
                <Folder className="h-5 w-5 text-blue-400" />
                Project Structure
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-[400px] lg:max-h-none overflow-y-auto">
              <div className="space-y-1 font-mono text-sm">
                {fileStructure.map((item, index) => {
                  // Determine if item should be visible based on expanded folders
                  const isVisible = (() => {
                    if (item.level === 0) return true;

                    // Check if all parent folders are expanded
                    let currentLevel = item.level;
                    for (let i = index - 1; i >= 0 && currentLevel > 0; i--) {
                      const parentItem = fileStructure[i];
                      if (
                        parentItem.type === "folder" &&
                        parentItem.level === currentLevel - 1
                      ) {
                        if (!expandedFolders.has(parentItem.name)) {
                          return false;
                        }
                        currentLevel--;
                      }
                    }
                    return true;
                  })();

                  if (!isVisible) return null;

                  const fileName = buildFilePath(index, item);

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className={`flex items-center gap-2 py-2 lg:py-1 px-2 rounded hover:bg-slate-800/50 transition-colors cursor-pointer ${
                        selectedFile === fileName
                          ? "bg-slate-800/70 border-l-2 border-blue-400"
                          : ""
                      }`}
                      style={{ paddingLeft: `${item.level * 20 + 8}px` }}
                      onClick={() => {
                        if (item.type === "folder") {
                          toggleFolder(item.name);
                        } else {
                          setSelectedFile(fileName);
                        }
                      }}
                    >
                      {item.type === "folder" ? (
                        expandedFolders.has(item.name) ? (
                          <FolderOpen className="h-4 w-4 text-blue-400" />
                        ) : (
                          <Folder className="h-4 w-4 text-blue-400" />
                        )
                      ) : (
                        <FileCode className="h-4 w-4 text-green-400" />
                      )}
                      <span
                        className={
                          item.type === "folder"
                            ? "text-blue-300"
                            : "text-slate-300"
                        }
                      >
                        {item.name}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="lg:col-span-2 order-1 lg:order-2"
        >
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2 text-lg">
                <FileCode className="h-5 w-5 text-green-400" />
                <span className="truncate">
                  {getFileFromPath(selectedFile)}
                </span>
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyCode(selectedFile)}
                className="border-slate-700 hover:bg-slate-800 flex-shrink-0"
              >
                <Copy className="h-4 w-4 mr-2" />
                {copied === selectedFile ? "Copied!" : "Copy"}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="text-xs sm:text-sm text-slate-300 overflow-x-auto bg-slate-950/50 p-3 lg:p-4 rounded-lg border border-slate-800 max-h-[300px] sm:max-h-[400px] lg:max-h-96">
                  <code className="whitespace-pre-wrap break-words lg:whitespace-pre lg:break-normal">
                    {codeFiles[selectedFile as keyof typeof codeFiles]}
                  </code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
