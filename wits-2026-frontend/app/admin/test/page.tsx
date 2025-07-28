import ApiTest from "@/components/admin/ApiTest";

export default function AdminTestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Admin API Test</h1>
        <ApiTest />

        <div className="mt-8 p-6 bg-white rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Debugging Steps:</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Open browser developer tools (F12)</li>
            <li>Go to Console tab</li>
            <li>Enter your admin credentials above</li>
            <li>Click "Test API" and check the console output</li>
            <li>Check the API response format</li>
          </ol>

          <div className="mt-6 p-4 bg-yellow-50 rounded">
            <h3 className="font-semibold text-yellow-800">
              Expected API Response Format:
            </h3>
            <pre className="text-xs mt-2 text-yellow-700">
              {`{
  "success": true,
  "message": "Login successful",
  "admin_username": "your_username"
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
