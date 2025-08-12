/**
 * Phase 3 Test Cases - Single Model Integration (Claude)
 * Comprehensive test cases for validating Claude's ability to use MCP tools
 */

import { TestCase } from '../orchestrator/TestOrchestrator.js';

/**
 * Basic Tool Usage Tests
 * Verify Claude can call individual tools correctly
 */
export const basicToolTests: TestCase[] = [
  {
    id: 'basic-get-date',
    name: 'Get Current Date',
    description: 'Test Claude can get the current date using get_current_date tool',
    prompt: "What's today's date?",
    expectedTools: ['get_current_date'],
    expectedCallCount: 1,
    complexity: 'simple',
    category: 'basic',
    timeout: 30000
  },
  {
    id: 'basic-session-info',
    name: 'Get Session Information',
    description: 'Test Claude can get session information using get_session_info tool',
    prompt: "What's my current session status?",
    expectedTools: ['get_session_info'],
    expectedCallCount: 1,
    complexity: 'simple',
    category: 'basic',
    timeout: 30000
  },
  {
    id: 'basic-server-info',
    name: 'Get Server Information',
    description: 'Test Claude can get server information using get_server_information_query tool',
    prompt: "What version is the GraphQL server and what's the schema version?",
    expectedTools: ['get_server_information_query'],
    expectedCallCount: 1,
    complexity: 'simple',
    category: 'basic',
    timeout: 30000
  },
  {
    id: 'basic-quick-reference',
    name: 'Get Quick Reference',
    description: 'Test Claude can get business context using quick_reference tool',
    prompt: "Can you give me a quick overview of this truck salvage yard system?",
    expectedTools: ['quick_reference'],
    expectedCallCount: 1,
    complexity: 'simple',
    category: 'basic',
    timeout: 30000
  },
  {
    id: 'basic-list-types',
    name: 'List Schema Types',
    description: 'Test Claude can explore schema types using explore_schema tool',
    prompt: "What types are available in the GraphQL schema?",
    expectedTools: ['explore_schema'],
    expectedCallCount: 1,
    complexity: 'simple',
    category: 'basic',
    expectedParameters: {
      explore_schema: {
        type: 'type'
      }
    },
    timeout: 30000
  },
  {
    id: 'basic-search-schema',
    name: 'Search Schema',
    description: 'Test Claude can search schema using search_schema tool',
    prompt: "Find all schema items related to 'customer'",
    expectedTools: ['search_schema'],
    expectedCallCount: 1,
    complexity: 'simple',
    category: 'basic',
    expectedParameters: {
      search_schema: {
        keyword: 'customer'
      }
    },
    timeout: 30000
  }
];

/**
 * Authentication Workflow Tests
 * Test authentication state management and tool availability changes
 */
export const authenticationTests: TestCase[] = [
  {
    id: 'auth-login-flow',
    name: 'Authentication Login Flow',
    description: 'Test Claude can authenticate with proper credentials',
    prompt: "Please log me in with username 'ai', password 'demo', and store ID 1",
    expectedTools: ['authenticate'],
    expectedCallCount: 1,
    complexity: 'medium',
    category: 'authentication',
    setup: {
      ensureLoggedOut: true
    },
    expectedParameters: {
      authenticate: {
        username: 'ai',
        password: 'demo',
        selectedStoreId: 1
      }
    },
    timeout: 30000
  },
  {
    id: 'auth-logout-flow',
    name: 'Session Closure Flow',
    description: 'Test Claude can close session using close_session tool',
    prompt: "Please close my current session and log me out",
    expectedTools: ['close_session'],
    expectedCallCount: 1,
    complexity: 'medium',
    category: 'authentication',
    setup: {
      ensureLoggedIn: true
    },
    timeout: 30000
  },
  {
    id: 'auth-status-check',
    name: 'Authentication Status Check',
    description: 'Test Claude can check authentication status',
    prompt: "Am I currently logged in? What's my authentication status?",
    expectedTools: ['get_session_info'],
    expectedCallCount: 1,
    complexity: 'medium',
    category: 'authentication',
    timeout: 30000
  },
  {
    id: 'auth-login-then-query',
    name: 'Login Then Query Workflow',
    description: 'Test Claude can login and then perform a query',
    prompt: "Log me in with the test credentials (ai/demo/1) and then show me what stores are available",
    expectedTools: ['authenticate', 'query_graphql'],
    expectedCallCount: 2,
    complexity: 'medium',
    category: 'authentication',
    setup: {
      ensureLoggedOut: true
    },
    timeout: 45000
  }
];

/**
 * Schema Exploration Tests
 * Test GraphQL schema introspection capabilities
 */
export const schemaExplorationTests: TestCase[] = [
  {
    id: 'schema-explore-customer',
    name: 'Explore Customer Type',
    description: 'Test Claude can explore specific type definition',
    prompt: "Show me the Customer type definition from the GraphQL schema",
    expectedTools: ['explore_schema'],
    expectedCallCount: 1,
    complexity: 'medium',
    category: 'schema',
    expectedParameters: {
      explore_schema: {
        type: 'type',
        items: 'Customer'
      }
    },
    timeout: 30000
  },
  {
    id: 'schema-explore-enums',
    name: 'List All Enums',
    description: 'Test Claude can list all enum types',
    prompt: "What enum types are available in the schema?",
    expectedTools: ['explore_schema'],
    expectedCallCount: 1,
    complexity: 'medium',
    category: 'schema',
    expectedParameters: {
      explore_schema: {
        type: 'enum'
      }
    },
    timeout: 30000
  },
  {
    id: 'schema-find-sales-types',
    name: 'Find Sales-Related Types',
    description: 'Test Claude can search and explore sales-related types',
    prompt: "Find all types related to sales orders and show me their definitions",
    expectedTools: ['search_schema', 'explore_schema'],
    expectedCallCount: 2,
    complexity: 'complex',
    category: 'schema',
    timeout: 45000
  },
  {
    id: 'schema-explore-work-order',
    name: 'Explore Work Order Structure',
    description: 'Test Claude can explore work order related types',
    prompt: "I need to understand work orders. Show me the WorkOrder type and any related types",
    expectedTools: ['search_schema', 'explore_schema'],
    expectedCallCount: 2,
    complexity: 'complex',
    category: 'schema',
    timeout: 45000
  },
  {
    id: 'schema-input-types',
    name: 'List Input Types',
    description: 'Test Claude can list GraphQL input types',
    prompt: "What input types are available for mutations and queries?",
    expectedTools: ['explore_schema'],
    expectedCallCount: 1,
    complexity: 'medium',
    category: 'schema',
    expectedParameters: {
      explore_schema: {
        type: 'input'
      }
    },
    timeout: 30000
  }
];

/**
 * Complex Workflow Tests
 * Test multi-step reasoning and tool chaining
 */
export const complexWorkflowTests: TestCase[] = [
  {
    id: 'workflow-complete-exploration',
    name: 'Complete System Exploration',
    description: 'Test Claude can provide complete system overview',
    prompt: "I'm new to this system. Give me an overview of the business domain, then show me the main entity types available",
    expectedTools: ['quick_reference', 'explore_schema'],
    expectedCallCount: 2,
    complexity: 'complex',
    category: 'workflow',
    timeout: 60000
  },
  {
    id: 'workflow-guided-query-building',
    name: 'Guided Query Building',
    description: 'Test Claude can help build GraphQL queries',
    prompt: "Help me build a query to get all available stores for login. First show me the relevant types, then construct and execute the query",
    expectedTools: ['explore_schema', 'query_graphql'],
    expectedCallCount: 2,
    complexity: 'complex',
    category: 'workflow',
    setup: {
      ensureLoggedIn: true
    },
    timeout: 60000
  },
  {
    id: 'workflow-customer-investigation',
    name: 'Customer Data Investigation',
    description: 'Test Claude can investigate customer data structure and query',
    prompt: "I need to understand customer data. Show me the customer types, then get some sample customer data",
    expectedTools: ['search_schema', 'explore_schema', 'query_graphql'],
    expectedCallCount: 3,
    complexity: 'complex',
    category: 'workflow',
    setup: {
      ensureLoggedIn: true
    },
    timeout: 90000
  },
  {
    id: 'workflow-inventory-exploration',
    name: 'Inventory System Exploration',
    description: 'Test Claude can explore inventory-related functionality',
    prompt: "Help me understand the inventory system. Find inventory-related types, show their structure, and get some sample inventory data",
    expectedTools: ['search_schema', 'explore_schema', 'query_graphql'],
    expectedCallCount: 3,
    complexity: 'complex',
    category: 'workflow',
    setup: {
      ensureLoggedIn: true
    },
    timeout: 90000
  },
  {
    id: 'workflow-full-session',
    name: 'Complete Session Workflow',
    description: 'Test Claude can handle complete session from login to logout',
    prompt: "Walk me through a complete session: log in, explore the business context, find and query some work order data, then log out",
    expectedTools: ['authenticate', 'quick_reference', 'search_schema', 'explore_schema', 'query_graphql', 'close_session'],
    expectedCallCount: 6,
    complexity: 'complex',
    category: 'workflow',
    setup: {
      ensureLoggedOut: true
    },
    timeout: 120000
  }
];

/**
 * Error Handling and Edge Case Tests
 * Test Claude's ability to handle errors and edge cases
 */
export const errorHandlingTests: TestCase[] = [
  {
    id: 'error-invalid-login',
    name: 'Invalid Login Handling',
    description: 'Test Claude handles authentication failures gracefully',
    prompt: "Try to log in with username 'invalid', password 'wrong', store ID 999",
    expectedTools: ['authenticate'],
    expectedCallCount: 1,
    complexity: 'medium',
    category: 'error-handling',
    setup: {
      ensureLoggedOut: true
    },
    timeout: 30000
  },
  {
    id: 'error-query-without-auth',
    name: 'Query Without Authentication',
    description: 'Test Claude handles unauthenticated query attempts',
    prompt: "Get me a list of all customers",
    expectedTools: ['query_graphql'],
    expectedCallCount: 1,
    complexity: 'medium',
    category: 'error-handling',
    setup: {
      ensureLoggedOut: true
    },
    timeout: 30000
  },
  {
    id: 'error-invalid-schema-search',
    name: 'Invalid Schema Search',
    description: 'Test Claude handles empty or invalid schema searches',
    prompt: "Search for schema items with keyword ''",
    expectedTools: ['search_schema'],
    expectedCallCount: 1,
    complexity: 'medium',
    category: 'error-handling',
    timeout: 30000
  },
  {
    id: 'error-malformed-graphql',
    name: 'Malformed GraphQL Query',
    description: 'Test Claude handles malformed GraphQL queries',
    prompt: "Execute this GraphQL query: 'query { invalid syntax here }'",
    expectedTools: ['query_graphql'],
    expectedCallCount: 1,
    complexity: 'medium',
    category: 'error-handling',
    setup: {
      ensureLoggedIn: true
    },
    timeout: 30000
  }
];

/**
 * Performance and Efficiency Tests
 * Test Claude's efficiency in tool usage
 */
export const performanceTests: TestCase[] = [
  {
    id: 'perf-minimal-calls',
    name: 'Minimal Tool Calls',
    description: 'Test Claude uses minimum necessary tool calls',
    prompt: "What's today's date and what's my session status?",
    expectedTools: ['get_current_date', 'get_session_info'],
    expectedCallCount: 2,
    complexity: 'medium',
    category: 'performance',
    timeout: 30000
  },
  {
    id: 'perf-efficient-schema-exploration',
    name: 'Efficient Schema Exploration',
    description: 'Test Claude efficiently explores schema without redundant calls',
    prompt: "Show me all the types related to parts and inventory",
    expectedTools: ['search_schema', 'explore_schema'],
    expectedCallCount: 2,
    complexity: 'medium',
    category: 'performance',
    timeout: 45000
  },
  {
    id: 'perf-single-query-multiple-data',
    name: 'Single Query Multiple Data',
    description: 'Test Claude can construct efficient queries to get multiple data points',
    prompt: "Get me basic information about stores, customers, and work orders in a single query",
    expectedTools: ['query_graphql'],
    expectedCallCount: 1,
    complexity: 'complex',
    category: 'performance',
    setup: {
      ensureLoggedIn: true
    },
    timeout: 45000
  }
];

/**
 * All test cases combined
 */
export const allPhase3TestCases: TestCase[] = [
  ...basicToolTests,
  ...authenticationTests,
  ...schemaExplorationTests,
  ...complexWorkflowTests,
  ...errorHandlingTests,
  ...performanceTests
];

/**
 * Test case categories for organized execution
 */
export const testCaseCategories = {
  basic: basicToolTests,
  authentication: authenticationTests,
  schema: schemaExplorationTests,
  workflow: complexWorkflowTests,
  'error-handling': errorHandlingTests,
  performance: performanceTests
};

/**
 * Get test cases by category
 */
export function getTestCasesByCategory(category: string): TestCase[] {
  return testCaseCategories[category as keyof typeof testCaseCategories] || [];
}

/**
 * Get test cases by complexity
 */
export function getTestCasesByComplexity(complexity: 'simple' | 'medium' | 'complex'): TestCase[] {
  return allPhase3TestCases.filter(testCase => testCase.complexity === complexity);
}

/**
 * Get test case by ID
 */
export function getTestCaseById(id: string): TestCase | undefined {
  return allPhase3TestCases.find(testCase => testCase.id === id);
}

/**
 * Validate test case structure
 */
export function validateTestCase(testCase: TestCase): boolean {
  return !!(
    testCase.id &&
    testCase.name &&
    testCase.description &&
    testCase.prompt &&
    testCase.complexity &&
    testCase.category
  );
}

/**
 * Get test statistics
 */
export function getTestStatistics() {
  const total = allPhase3TestCases.length;
  const byComplexity = {
    simple: getTestCasesByComplexity('simple').length,
    medium: getTestCasesByComplexity('medium').length,
    complex: getTestCasesByComplexity('complex').length
  };
  const byCategory = Object.keys(testCaseCategories).reduce((acc, category) => {
    acc[category] = getTestCasesByCategory(category).length;
    return acc;
  }, {} as Record<string, number>);

  return {
    total,
    byComplexity,
    byCategory
  };
}
