import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing required Supabase environment variables");
}

// Create Supabase client with service role key (bypasses RLS)
const supabase = createClient(
  SUPABASE_URL || "",
  SUPABASE_SERVICE_ROLE_KEY || "",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export const supabaseTools = {
  // Supabase Get Document Tool
  getDocument: {
    name: "getDocument",
    description: "Get a document by its unique ID from the Supabase database",
    schema: {
      documentId: z
        .string()
        .describe("The unique ID (UUID) of the document to retrieve"),
      tableName: z
        .string()
        .optional()
        .describe("The table name (defaults to 'companies')"),
    },
    handler: async ({
      documentId,
      tableName = "companies",
    }: {
      documentId: string;
      tableName?: string;
    }) => {
      try {
        console.log(
          `Fetching document with ID: ${documentId} from table: ${tableName}`
        );

        const { data, error } = await supabase
          .from(tableName)
          .select("*")
          .eq("id", documentId)
          .single();

        if (error) throw error;

        console.log("Document retrieved successfully:", data);

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  success: true,
                  document: data,
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

  // Supabase List Documents Tool
  listDocuments: {
    name: "listDocuments",
    description: "List all documents from a Supabase table",
    schema: {
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
        .describe("Sort order - true for ascending, false for descending (defaults to false)"),
    },
    handler: async ({
      tableName = "companies",
      limit = 25,
      offset = 0,
      orderBy = "created_at",
      ascending = false,
    }: {
      tableName?: string;
      limit?: number;
      offset?: number;
      orderBy?: string;
      ascending?: boolean;
    }) => {
      try {
        console.log(
          `Listing documents from table: ${tableName} with limit: ${limit}, offset: ${offset}`
        );

        const { data, error, count } = await supabase
          .from(tableName)
          .select("*", { count: "exact" })
          .order(orderBy, { ascending })
          .range(offset, offset + limit - 1);

        if (error) throw error;

        console.log(`Retrieved ${data?.length || 0} documents`);

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  success: true,
                  total: count,
                  count: data?.length || 0,
                  documents: data,
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

  // Supabase Create Document Tool
  createDocument: {
    name: "createDocument",
    description: "Create a new document in the Supabase database",
    schema: {
      company_name: z.string().describe("The name of the company"),
      company_id: z
        .number()
        .describe("The unique identifier for the company (integer)"),
      description: z
        .string()
        .optional()
        .describe("Company description"),
      website: z
        .string()
        .optional()
        .describe("Company website URL"),
      employee_count: z
        .number()
        .optional()
        .describe("Number of employees"),
      founded_year: z
        .number()
        .optional()
        .describe("Year the company was founded"),
      industry: z
        .string()
        .optional()
        .describe("Industry sector"),
      tableName: z
        .string()
        .optional()
        .describe("The table name (defaults to 'companies')"),
    },
    handler: async ({
      company_name,
      company_id,
      description,
      website,
      employee_count,
      founded_year,
      industry,
      tableName = "companies",
    }: {
      company_name: string;
      company_id: number;
      description?: string;
      website?: string;
      employee_count?: number;
      founded_year?: number;
      industry?: string;
      tableName?: string;
    }) => {
      try {
        console.log(
          `Creating document in table: ${tableName} with data:`,
          { company_name, company_id }
        );

        const insertData: {
          company_name: string;
          company_id: number;
          description?: string;
          website?: string;
          employee_count?: number;
          founded_year?: number;
          industry?: string;
        } = {
          company_name,
          company_id,
        };

        if (description !== undefined) insertData.description = description;
        if (website !== undefined) insertData.website = website;
        if (employee_count !== undefined) insertData.employee_count = employee_count;
        if (founded_year !== undefined) insertData.founded_year = founded_year;
        if (industry !== undefined) insertData.industry = industry;

        const { data, error } = await supabase
          .from(tableName)
          .insert(insertData)
          .select()
          .single();

        if (error) throw error;

        console.log("Document created successfully:", data);

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  success: true,
                  message: "Document created successfully",
                  document: data,
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

  // Supabase Update Document Tool
  updateDocument: {
    name: "updateDocument",
    description: "Update an existing document in the Supabase database",
    schema: {
      documentId: z
        .string()
        .describe("The unique ID (UUID) of the document to update"),
      company_name: z
        .string()
        .optional()
        .describe("The name of the company (optional)"),
      company_id: z
        .number()
        .optional()
        .describe("The unique identifier for the company (optional integer)"),
      description: z
        .string()
        .optional()
        .describe("Company description"),
      website: z
        .string()
        .optional()
        .describe("Company website URL"),
      employee_count: z
        .number()
        .optional()
        .describe("Number of employees"),
      founded_year: z
        .number()
        .optional()
        .describe("Year the company was founded"),
      industry: z
        .string()
        .optional()
        .describe("Industry sector"),
      tableName: z
        .string()
        .optional()
        .describe("The table name (defaults to 'companies')"),
    },
    handler: async ({
      documentId,
      company_name,
      company_id,
      description,
      website,
      employee_count,
      founded_year,
      industry,
      tableName = "companies",
    }: {
      documentId: string;
      company_name?: string;
      company_id?: number;
      description?: string;
      website?: string;
      employee_count?: number;
      founded_year?: number;
      industry?: string;
      tableName?: string;
    }) => {
      try {
        const updateData: Record<string, string | number> = {};
        if (company_name !== undefined) updateData.company_name = company_name;
        if (company_id !== undefined) updateData.company_id = company_id;
        if (description !== undefined) updateData.description = description;
        if (website !== undefined) updateData.website = website;
        if (employee_count !== undefined) updateData.employee_count = employee_count;
        if (founded_year !== undefined) updateData.founded_year = founded_year;
        if (industry !== undefined) updateData.industry = industry;

        if (Object.keys(updateData).length === 0) {
          throw new Error("At least one field must be provided for update");
        }

        console.log(
          `Updating document with ID: ${documentId} in table: ${tableName} with data:`,
          updateData
        );

        const { data, error } = await supabase
          .from(tableName)
          .update(updateData)
          .eq("id", documentId)
          .select()
          .single();

        if (error) throw error;

        console.log("Document updated successfully:", data);

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  success: true,
                  message: "Document updated successfully",
                  document: data,
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

  // Supabase Delete Document Tool
  deleteDocument: {
    name: "deleteDocument",
    description: "Delete a document from the Supabase database",
    schema: {
      documentId: z
        .string()
        .describe("The unique ID (UUID) of the document to delete"),
      tableName: z
        .string()
        .optional()
        .describe("The table name (defaults to 'companies')"),
    },
    handler: async ({
      documentId,
      tableName = "companies",
    }: {
      documentId: string;
      tableName?: string;
    }) => {
      try {
        console.log(
          `Deleting document with ID: ${documentId} from table: ${tableName}`
        );

        const { error } = await supabase
          .from(tableName)
          .delete()
          .eq("id", documentId);

        if (error) throw error;

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

  // Supabase Upsert Document Tool
  upsertDocument: {
    name: "upsertDocument",
    description:
      "Create or update a document in the Supabase database (upsert operation based on company_id)",
    schema: {
      company_name: z.string().describe("The name of the company"),
      company_id: z
        .number()
        .describe("The unique identifier for the company (integer)"),
      description: z
        .string()
        .optional()
        .describe("Company description"),
      website: z
        .string()
        .optional()
        .describe("Company website URL"),
      employee_count: z
        .number()
        .optional()
        .describe("Number of employees"),
      founded_year: z
        .number()
        .optional()
        .describe("Year the company was founded"),
      industry: z
        .string()
        .optional()
        .describe("Industry sector"),
      tableName: z
        .string()
        .optional()
        .describe("The table name (defaults to 'companies')"),
    },
    handler: async ({
      company_name,
      company_id,
      description,
      website,
      employee_count,
      founded_year,
      industry,
      tableName = "companies",
    }: {
      company_name: string;
      company_id: number;
      description?: string;
      website?: string;
      employee_count?: number;
      founded_year?: number;
      industry?: string;
      tableName?: string;
    }) => {
      try {
        console.log(
          `Attempting upsert for company_id: ${company_id} in table: ${tableName}`
        );

        const upsertData: {
          company_name: string;
          company_id: number;
          description?: string;
          website?: string;
          employee_count?: number;
          founded_year?: number;
          industry?: string;
        } = {
          company_name,
          company_id,
        };

        if (description !== undefined) upsertData.description = description;
        if (website !== undefined) upsertData.website = website;
        if (employee_count !== undefined) upsertData.employee_count = employee_count;
        if (founded_year !== undefined) upsertData.founded_year = founded_year;
        if (industry !== undefined) upsertData.industry = industry;

        const { data, error } = await supabase
          .from(tableName)
          .upsert(upsertData, { onConflict: "company_id" })
          .select()
          .single();

        if (error) throw error;

        console.log("Document upserted successfully:", data);

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  success: true,
                  message: "Document upserted successfully",
                  document: data,
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

  // Supabase Clear Collection Tool
  clearCollection: {
    name: "clearCollection",
    description: "Delete all documents from a Supabase table (use with caution!)",
    schema: {
      tableName: z
        .string()
        .optional()
        .describe("The table name (defaults to 'companies')"),
      confirm: z
        .boolean()
        .describe("Must be set to true to confirm deletion of all records"),
    },
    handler: async ({
      tableName = "companies",
      confirm,
    }: {
      tableName?: string;
      confirm: boolean;
    }) => {
      try {
        if (!confirm) {
          throw new Error("Confirmation required. Set confirm parameter to true.");
        }

        console.log(`Clearing all documents from table: ${tableName}`);

        const { error } = await supabase
          .from(tableName)
          .delete()
          .neq("id", "00000000-0000-0000-0000-000000000000"); // Delete all records

        if (error) throw error;

        console.log("All documents cleared successfully");

        return {
          content: [
            {
              type: "text" as const,
              text: JSON.stringify(
                {
                  success: true,
                  message: `All documents cleared from table: ${tableName}`,
                },
                null,
                2
              ),
            },
          ],
        };
      } catch (error) {
        console.error("Error clearing collection:", error);

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
};
