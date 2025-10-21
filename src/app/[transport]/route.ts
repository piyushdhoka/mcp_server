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
            text: `# Piyush Dhoka
            🤖 AI/ML Engineer & Developer

            ## About Me
            I'm a passionate AI/ML Engineer specializing in artificial intelligence, machine learning, and modern web development. Focused on building intelligent systems and scalable applications.

            ## 🛠️ Technical Skills
            **AI/ML:** TensorFlow, PyTorch, Scikit-learn, Neural Networks, Deep Learning, NLP, Computer Vision
            **Backend:** Python, Node.js, FastAPI, Express.js
            **Frontend:** React.js, Next.js, TypeScript, JavaScript
            **Databases:** PostgreSQL, MongoDB, Supabase, Vector Databases
            **Cloud & DevOps:** AWS, Google Cloud, Docker, Kubernetes
            **Tools:** Git, Jupyter, VS Code, Postman

            ## 🤖 AI/ML Expertise
            • Machine Learning Model Development
            • Deep Learning & Neural Networks
            • Natural Language Processing (NLP)
            • Computer Vision Applications
            • Data Science & Analytics
            • Model Deployment & MLOps
            • AI Integration in Web Applications

            ## 🚀 Current Projects
            • Building MCP servers for AI agent integration
            • Developing intelligent database management systems
            • Creating ML-powered web applications
            • Exploring LLM integrations and prompt engineering

            ## 🎯 Focus Areas
            • AI/ML Engineering
            • Full-Stack Development
            • Database Architecture
            • Cloud Infrastructure
            • MLOps & Model Deployment

            ---
            *"Building intelligent systems, one model at a time."*`,
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
      "List all documents from a Supabase table",
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
            "Get detailed information about Piyush Dhoka - AI/ML Engineer and Developer (Creator of this tool).",
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
