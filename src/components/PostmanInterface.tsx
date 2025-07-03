import React, { useState, useRef, useEffect } from 'react';
import { Send, Plus, Folder, Play, Save, Upload, Download, Settings, Eye, EyeOff, Copy, Check, Trash2, Edit, Search, Filter, Globe, Lock, Unlock, Clock, AlertCircle, CheckCircle, X, FileText, Code, Database, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PostmanCollection {
  id: string;
  name: string;
  description: string;
  requests: PostmanRequest[];
  variables?: { [key: string]: string };
  auth?: {
    type: string;
    bearer?: { token: string };
    basic?: { username: string; password: string };
  };
}

interface PostmanRequest {
  id: string;
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
  url: string;
  headers: { key: string; value: string; enabled: boolean }[];
  body?: {
    mode: 'raw' | 'form-data' | 'x-www-form-urlencoded' | 'binary';
    raw?: string;
    formdata?: { key: string; value: string; type: 'text' | 'file' }[];
  };
  tests?: string;
  preRequestScript?: string;
}

interface RequestResponse {
  status: number;
  statusText: string;
  headers: { [key: string]: string };
  data: string;
  time: number;
  size: number;
}

const PostmanInterface: React.FC = () => {
  const [collections, setCollections] = useState<PostmanCollection[]>([]);
  const [activeCollection, setActiveCollection] = useState<string | null>(null);
  const [activeRequest, setActiveRequest] = useState<string | null>(null);
  const [currentRequest, setCurrentRequest] = useState<PostmanRequest>({
    id: 'new',
    name: 'New Request',
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/posts',
    headers: [
      { key: 'Content-Type', value: 'application/json', enabled: true },
      { key: 'User-Agent', value: 'Postman-Clone/1.0', enabled: true }
    ]
  });
  const [response, setResponse] = useState<RequestResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'params' | 'headers' | 'body' | 'auth' | 'tests'>('headers');
  const [responseTab, setResponseTab] = useState<'body' | 'headers' | 'test-results'>('body');
  const [environment, setEnvironment] = useState<{ [key: string]: string }>({
    baseUrl: 'https://jsonplaceholder.typicode.com',
    apiKey: 'demo-key-123'
  });
  const [showEnvironment, setShowEnvironment] = useState(false);
  const [history, setHistory] = useState<(PostmanRequest & { timestamp: Date; response?: RequestResponse })[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Coleções de exemplo
  useEffect(() => {
    const exampleCollections: PostmanCollection[] = [
      {
        id: 'jsonplaceholder',
        name: 'JSONPlaceholder API',
        description: 'Coleção de testes para API de exemplo JSONPlaceholder',
        requests: [
          {
            id: 'get-posts',
            name: 'Get All Posts',
            method: 'GET',
            url: '{{baseUrl}}/posts',
            headers: [
              { key: 'Content-Type', value: 'application/json', enabled: true }
            ]
          },
          {
            id: 'get-post',
            name: 'Get Single Post',
            method: 'GET',
            url: '{{baseUrl}}/posts/1',
            headers: [
              { key: 'Content-Type', value: 'application/json', enabled: true }
            ]
          },
          {
            id: 'create-post',
            name: 'Create Post',
            method: 'POST',
            url: '{{baseUrl}}/posts',
            headers: [
              { key: 'Content-Type', value: 'application/json', enabled: true }
            ],
            body: {
              mode: 'raw',
              raw: JSON.stringify({
                title: 'Novo Post via Postman Clone',
                body: 'Este é um post criado através da interface Postman clone do portfólio da Esther!',
                userId: 1
              }, null, 2)
            }
          },
          {
            id: 'update-post',
            name: 'Update Post',
            method: 'PUT',
            url: '{{baseUrl}}/posts/1',
            headers: [
              { key: 'Content-Type', value: 'application/json', enabled: true }
            ],
            body: {
              mode: 'raw',
              raw: JSON.stringify({
                id: 1,
                title: 'Post Atualizado',
                body: 'Conteúdo atualizado via Postman Clone',
                userId: 1
              }, null, 2)
            }
          },
          {
            id: 'delete-post',
            name: 'Delete Post',
            method: 'DELETE',
            url: '{{baseUrl}}/posts/1',
            headers: [
              { key: 'Content-Type', value: 'application/json', enabled: true }
            ]
          }
        ]
      },
      {
        id: 'httpbin',
        name: 'HTTPBin Testing',
        description: 'Testes diversos com HTTPBin para validação de requests',
        requests: [
          {
            id: 'test-get',
            name: 'Test GET Request',
            method: 'GET',
            url: 'https://httpbin.org/get',
            headers: [
              { key: 'User-Agent', value: 'Postman-Clone-Portfolio', enabled: true }
            ]
          },
          {
            id: 'test-post',
            name: 'Test POST Request',
            method: 'POST',
            url: 'https://httpbin.org/post',
            headers: [
              { key: 'Content-Type', value: 'application/json', enabled: true }
            ],
            body: {
              mode: 'raw',
              raw: JSON.stringify({
                message: 'Teste do Postman Clone',
                author: 'Esther Gabrielle',
                timestamp: new Date().toISOString()
              }, null, 2)
            }
          },
          {
            id: 'test-headers',
            name: 'Test Headers',
            method: 'GET',
            url: 'https://httpbin.org/headers',
            headers: [
              { key: 'X-Custom-Header', value: 'Portfolio-Demo', enabled: true },
              { key: 'X-QA-Tester', value: 'Esther-Gabrielle', enabled: true }
            ]
          }
        ]
      }
    ];

    setCollections(exampleCollections);
    setActiveCollection('jsonplaceholder');
  }, []);

  const replaceVariables = (text: string): string => {
    let result = text;
    Object.entries(environment).forEach(([key, value]) => {
      result = result.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });
    return result;
  };

  const executeRequest = async () => {
    setLoading(true);
    setResponse(null);

    try {
      const startTime = Date.now();
      const url = replaceVariables(currentRequest.url);
      
      const headers: { [key: string]: string } = {};
      currentRequest.headers
        .filter(h => h.enabled && h.key && h.value)
        .forEach(h => {
          headers[h.key] = replaceVariables(h.value);
        });

      const requestOptions: RequestInit = {
        method: currentRequest.method,
        headers,
      };

      if (currentRequest.body && ['POST', 'PUT', 'PATCH'].includes(currentRequest.method)) {
        if (currentRequest.body.mode === 'raw' && currentRequest.body.raw) {
          requestOptions.body = replaceVariables(currentRequest.body.raw);
        }
      }

      const response = await fetch(url, requestOptions);
      const endTime = Date.now();
      
      const responseHeaders: { [key: string]: string } = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      const responseText = await response.text();
      let responseData = responseText;
      
      try {
        const jsonData = JSON.parse(responseText);
        responseData = JSON.stringify(jsonData, null, 2);
      } catch {
        // Se não for JSON, mantém como texto
      }

      const responseObj: RequestResponse = {
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
        data: responseData,
        time: endTime - startTime,
        size: new Blob([responseText]).size
      };

      setResponse(responseObj);

      // Adicionar ao histórico
      const historyEntry = {
        ...currentRequest,
        timestamp: new Date(),
        response: responseObj
      };
      setHistory(prev => [historyEntry, ...prev.slice(0, 49)]); // Manter apenas 50 entradas

    } catch (error) {
      const errorResponse: RequestResponse = {
        status: 0,
        statusText: 'Network Error',
        headers: {},
        data: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        time: 0,
        size: 0
      };
      setResponse(errorResponse);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const collectionData = JSON.parse(content);
        
        // Validar se é uma coleção válida do Postman
        if (!collectionData.info || !collectionData.info.name) {
          alert('Arquivo não é uma coleção válida do Postman');
          return;
        }

        // Converter para nosso formato
        const newCollection: PostmanCollection = {
          id: Date.now().toString(),
          name: collectionData.info.name,
          description: collectionData.info.description || '',
          requests: extractRequestsFromCollection(collectionData)
        };

        setCollections(prev => [...prev, newCollection]);
        setActiveCollection(newCollection.id);
        alert(`Coleção "${newCollection.name}" importada com sucesso!`);
      } catch (error) {
        alert('Erro ao importar coleção. Verifique se o arquivo é válido.');
      }
    };
    reader.readAsText(file);
  };

  const extractRequestsFromCollection = (collection: any): PostmanRequest[] => {
    const requests: PostmanRequest[] = [];
    
    const processItem = (item: any) => {
      if (item.request) {
        const request: PostmanRequest = {
          id: item.id || Date.now().toString(),
          name: item.name || 'Unnamed Request',
          method: item.request.method || 'GET',
          url: typeof item.request.url === 'string' ? item.request.url : item.request.url?.raw || '',
          headers: (item.request.header || []).map((h: any) => ({
            key: h.key || '',
            value: h.value || '',
            enabled: !h.disabled
          }))
        };

        if (item.request.body) {
          request.body = {
            mode: item.request.body.mode || 'raw',
            raw: item.request.body.raw || ''
          };
        }

        requests.push(request);
      }
      
      if (item.item && Array.isArray(item.item)) {
        item.item.forEach(processItem);
      }
    };
    
    if (collection.item && Array.isArray(collection.item)) {
      collection.item.forEach(processItem);
    }
    
    return requests;
  };

  const exportCollection = () => {
    if (!activeCollection) return;
    
    const collection = collections.find(c => c.id === activeCollection);
    if (!collection) return;

    const exportData = {
      info: {
        name: collection.name,
        description: collection.description,
        schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
      },
      item: collection.requests.map(req => ({
        name: req.name,
        request: {
          method: req.method,
          header: req.headers.map(h => ({
            key: h.key,
            value: h.value,
            disabled: !h.enabled
          })),
          url: {
            raw: req.url,
            host: req.url.split('/').slice(2, 3),
            path: req.url.split('/').slice(3)
          },
          body: req.body ? {
            mode: req.body.mode,
            raw: req.body.raw
          } : undefined
        }
      }))
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${collection.name.replace(/\s+/g, '_')}.postman_collection.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'text-green-600 bg-green-100';
      case 'POST': return 'text-blue-600 bg-blue-100';
      case 'PUT': return 'text-orange-600 bg-orange-100';
      case 'DELETE': return 'text-red-600 bg-red-100';
      case 'PATCH': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return 'text-green-600';
    if (status >= 300 && status < 400) return 'text-yellow-600';
    if (status >= 400 && status < 500) return 'text-orange-600';
    if (status >= 500) return 'text-red-600';
    return 'text-gray-600';
  };

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes}B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
  };

  const currentCollection = collections.find(c => c.id === activeCollection);

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <Send className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Postman Clone</h1>
            </div>
            <div className="text-sm text-gray-500">
              Interface funcional para testes de API
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowEnvironment(!showEnvironment)}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4" />
              Environment
            </button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg transition-colors"
            >
              <Upload className="w-4 h-4" />
              Import
            </button>
            
            {activeCollection && (
              <button
                onClick={exportCollection}
                className="flex items-center gap-2 px-3 py-2 text-sm bg-green-100 text-green-700 hover:bg-green-200 rounded-lg transition-colors"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Collections */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Collections</h3>
            <div className="space-y-2">
              {collections.map(collection => (
                <div
                  key={collection.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    activeCollection === collection.id
                      ? 'bg-orange-100 border border-orange-200'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveCollection(collection.id)}
                >
                  <div className="flex items-center gap-2">
                    <Folder className="w-4 h-4 text-orange-500" />
                    <span className="font-medium text-sm">{collection.name}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{collection.description}</p>
                  <div className="text-xs text-gray-400 mt-1">
                    {collection.requests.length} requests
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Requests */}
          {currentCollection && (
            <div className="flex-1 p-4 overflow-y-auto">
              <h4 className="font-semibold text-gray-900 mb-3">Requests</h4>
              <div className="space-y-1">
                {currentCollection.requests.map(request => (
                  <div
                    key={request.id}
                    className={`p-2 rounded-lg cursor-pointer transition-colors ${
                      activeRequest === request.id
                        ? 'bg-blue-100 border border-blue-200'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      setActiveRequest(request.id);
                      setCurrentRequest(request);
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-bold rounded ${getMethodColor(request.method)}`}>
                        {request.method}
                      </span>
                      <span className="text-sm font-medium truncate">{request.name}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* History */}
          {history.length > 0 && (
            <div className="border-t border-gray-200 p-4">
              <h4 className="font-semibold text-gray-900 mb-3">History</h4>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {history.slice(0, 10).map((item, index) => (
                  <div
                    key={index}
                    className="p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => setCurrentRequest(item)}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`px-1 py-0.5 text-xs font-bold rounded ${getMethodColor(item.method)}`}>
                        {item.method}
                      </span>
                      <span className="text-xs truncate">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      {item.response && (
                        <span className={`text-xs ${getStatusColor(item.response.status)}`}>
                          {item.response.status}
                        </span>
                      )}
                      <span className="text-xs text-gray-400">
                        {item.timestamp.toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Request Builder */}
          <div className="bg-white border-b border-gray-200 p-6">
            {/* URL Bar */}
            <div className="flex items-center gap-3 mb-4">
              <select
                value={currentRequest.method}
                onChange={(e) => setCurrentRequest(prev => ({ ...prev, method: e.target.value as any }))}
                className="px-3 py-2 border border-gray-300 rounded-lg font-medium text-sm"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
                <option value="PATCH">PATCH</option>
                <option value="HEAD">HEAD</option>
                <option value="OPTIONS">OPTIONS</option>
              </select>
              
              <input
                type="text"
                value={currentRequest.url}
                onChange={(e) => setCurrentRequest(prev => ({ ...prev, url: e.target.value }))}
                placeholder="Enter request URL"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
              />
              
              <button
                onClick={executeRequest}
                disabled={loading}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                Send
              </button>
            </div>

            {/* Request Tabs */}
            <div className="flex border-b border-gray-200">
              {[
                { id: 'headers', label: 'Headers', icon: FileText },
                { id: 'body', label: 'Body', icon: Code },
                { id: 'auth', label: 'Authorization', icon: Lock },
                { id: 'tests', label: 'Tests', icon: CheckCircle }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Request Content */}
            <div className="mt-4">
              {activeTab === 'headers' && (
                <div className="space-y-2">
                  {currentRequest.headers.map((header, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={header.enabled}
                        onChange={(e) => {
                          const newHeaders = [...currentRequest.headers];
                          newHeaders[index].enabled = e.target.checked;
                          setCurrentRequest(prev => ({ ...prev, headers: newHeaders }));
                        }}
                        className="rounded"
                      />
                      <input
                        type="text"
                        value={header.key}
                        onChange={(e) => {
                          const newHeaders = [...currentRequest.headers];
                          newHeaders[index].key = e.target.value;
                          setCurrentRequest(prev => ({ ...prev, headers: newHeaders }));
                        }}
                        placeholder="Header name"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded"
                      />
                      <input
                        type="text"
                        value={header.value}
                        onChange={(e) => {
                          const newHeaders = [...currentRequest.headers];
                          newHeaders[index].value = e.target.value;
                          setCurrentRequest(prev => ({ ...prev, headers: newHeaders }));
                        }}
                        placeholder="Header value"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded"
                      />
                      <button
                        onClick={() => {
                          const newHeaders = currentRequest.headers.filter((_, i) => i !== index);
                          setCurrentRequest(prev => ({ ...prev, headers: newHeaders }));
                        }}
                        className="p-2 text-red-500 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const newHeaders = [...currentRequest.headers, { key: '', value: '', enabled: true }];
                      setCurrentRequest(prev => ({ ...prev, headers: newHeaders }));
                    }}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Plus className="w-4 h-4" />
                    Add Header
                  </button>
                </div>
              )}

              {activeTab === 'body' && ['POST', 'PUT', 'PATCH'].includes(currentRequest.method) && (
                <div>
                  <div className="mb-3">
                    <select
                      value={currentRequest.body?.mode || 'raw'}
                      onChange={(e) => {
                        setCurrentRequest(prev => ({
                          ...prev,
                          body: { ...prev.body, mode: e.target.value as any }
                        }));
                      }}
                      className="px-3 py-2 border border-gray-300 rounded text-sm"
                    >
                      <option value="raw">raw</option>
                      <option value="form-data">form-data</option>
                      <option value="x-www-form-urlencoded">x-www-form-urlencoded</option>
                    </select>
                  </div>
                  
                  {currentRequest.body?.mode === 'raw' && (
                    <textarea
                      value={currentRequest.body?.raw || ''}
                      onChange={(e) => {
                        setCurrentRequest(prev => ({
                          ...prev,
                          body: { ...prev.body, mode: 'raw', raw: e.target.value }
                        }));
                      }}
                      placeholder="Enter request body"
                      className="w-full h-40 px-3 py-2 border border-gray-300 rounded font-mono text-sm"
                    />
                  )}
                </div>
              )}

              {activeTab === 'auth' && (
                <div className="text-sm text-gray-500">
                  Authentication settings would go here in a full implementation.
                </div>
              )}

              {activeTab === 'tests' && (
                <div className="text-sm text-gray-500">
                  Test scripts would go here in a full implementation.
                </div>
              )}
            </div>
          </div>

          {/* Response */}
          <div className="flex-1 bg-gray-50 p-6 overflow-hidden">
            {response ? (
              <div className="h-full flex flex-col">
                {/* Response Status */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <span className={`text-lg font-bold ${getStatusColor(response.status)}`}>
                      {response.status} {response.statusText}
                    </span>
                    <span className="text-sm text-gray-500">
                      Time: {formatTime(response.time)}
                    </span>
                    <span className="text-sm text-gray-500">
                      Size: {formatSize(response.size)}
                    </span>
                  </div>
                </div>

                {/* Response Tabs */}
                <div className="flex border-b border-gray-200 mb-4">
                  {[
                    { id: 'body', label: 'Body' },
                    { id: 'headers', label: 'Headers' },
                    { id: 'test-results', label: 'Test Results' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setResponseTab(tab.id as any)}
                      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                        responseTab === tab.id
                          ? 'border-orange-500 text-orange-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Response Content */}
                <div className="flex-1 overflow-hidden">
                  {responseTab === 'body' && (
                    <pre className="h-full overflow-auto bg-white p-4 rounded border text-sm font-mono">
                      {response.data}
                    </pre>
                  )}

                  {responseTab === 'headers' && (
                    <div className="h-full overflow-auto bg-white p-4 rounded border">
                      {Object.entries(response.headers).map(([key, value]) => (
                        <div key={key} className="flex py-1 text-sm">
                          <span className="font-medium w-1/3">{key}:</span>
                          <span className="text-gray-600">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {responseTab === 'test-results' && (
                    <div className="h-full overflow-auto bg-white p-4 rounded border text-sm text-gray-500">
                      Test results would appear here in a full implementation.
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Send className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Send a request to see the response</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Environment Modal */}
      <AnimatePresence>
        {showEnvironment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowEnvironment(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-96 max-h-96 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Environment Variables</h3>
                <button
                  onClick={() => setShowEnvironment(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-3">
                {Object.entries(environment).map(([key, value]) => (
                  <div key={key} className="flex gap-2">
                    <input
                      type="text"
                      value={key}
                      readOnly
                      className="flex-1 px-3 py-2 border border-gray-300 rounded bg-gray-50"
                    />
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => {
                        setEnvironment(prev => ({ ...prev, [key]: e.target.value }));
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded"
                    />
                  </div>
                ))}
              </div>
              
              <div className="mt-4 text-sm text-gray-500">
                Use variables in requests with {`{{variableName}}`} syntax
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostmanInterface;