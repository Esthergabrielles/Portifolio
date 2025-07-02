import React, { useState, useEffect } from 'react';
import { Send, Plus, Trash2, Copy, Download, Save, Play, Settings, Eye, Code, History, Folder, Search, X, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PostmanCollection {
  id: string;
  name: string;
  description: string;
  requests: PostmanRequest[];
  variables: PostmanVariable[];
  createdAt: string;
  updatedAt: string;
}

interface PostmanRequest {
  id: string;
  name: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  url: string;
  headers: { key: string; value: string; enabled: boolean }[];
  body: string;
  bodyType: 'none' | 'json' | 'form-data' | 'x-www-form-urlencoded';
  description?: string;
  tests?: string;
  preRequestScript?: string;
}

interface PostmanVariable {
  key: string;
  value: string;
  type: 'default' | 'secret';
}

interface Response {
  status: number;
  statusText: string;
  headers: { [key: string]: string };
  body: string;
  time: number;
  size: string;
}

const PostmanInterface: React.FC = () => {
  const [collections, setCollections] = useState<PostmanCollection[]>([]);
  const [selectedCollection, setSelectedCollection] = useState<PostmanCollection | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<PostmanRequest | null>(null);
  const [expandedCollections, setExpandedCollections] = useState<Set<string>>(new Set());
  
  const [activeTab, setActiveTab] = useState<'request' | 'response'>('request');
  const [selectedMethod, setSelectedMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'>('GET');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState([
    { key: 'Content-Type', value: 'application/json', enabled: true },
    { key: '', value: '', enabled: true }
  ]);
  const [body, setBody] = useState('');
  const [bodyType, setBodyType] = useState<'none' | 'json' | 'form-data' | 'x-www-form-urlencoded'>('json');
  const [response, setResponse] = useState<Response | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [environment, setEnvironment] = useState<{ [key: string]: string }>({});

  // Carregar coleções do localStorage
  useEffect(() => {
    const savedCollections = localStorage.getItem('postman_collections');
    if (savedCollections) {
      const parsedCollections = JSON.parse(savedCollections);
      setCollections(parsedCollections);
      
      // Auto-selecionar primeira coleção se existir
      if (parsedCollections.length > 0) {
        setSelectedCollection(parsedCollections[0]);
        setExpandedCollections(new Set([parsedCollections[0].id]));
        
        // Auto-selecionar primeiro request se existir
        if (parsedCollections[0].requests.length > 0) {
          loadRequest(parsedCollections[0].requests[0]);
        }
      }
    }
  }, []);

  // Processar variáveis de ambiente
  useEffect(() => {
    if (selectedCollection) {
      const env: { [key: string]: string } = {};
      selectedCollection.variables.forEach(variable => {
        env[variable.key] = variable.value;
      });
      setEnvironment(env);
    }
  }, [selectedCollection]);

  const methods = [
    { name: 'GET', color: 'text-green-500 bg-green-100 dark:bg-green-900/30' },
    { name: 'POST', color: 'text-orange-500 bg-orange-100 dark:bg-orange-900/30' },
    { name: 'PUT', color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30' },
    { name: 'DELETE', color: 'text-red-500 bg-red-100 dark:bg-red-900/30' },
    { name: 'PATCH', color: 'text-purple-500 bg-purple-100 dark:bg-purple-900/30' }
  ];

  // Substituir variáveis na URL
  const processUrl = (rawUrl: string) => {
    let processedUrl = rawUrl;
    Object.entries(environment).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      processedUrl = processedUrl.replace(regex, value);
    });
    return processedUrl;
  };

  // Carregar request selecionado
  const loadRequest = (request: PostmanRequest) => {
    setSelectedRequest(request);
    setSelectedMethod(request.method);
    setUrl(request.url);
    setHeaders([...request.headers, { key: '', value: '', enabled: true }]);
    setBody(request.body);
    setBodyType(request.bodyType);
    setResponse(null);
    setActiveTab('request');
  };

  // Enviar request
  const handleSendRequest = async () => {
    setIsLoading(true);
    setActiveTab('response');
    
    try {
      const startTime = Date.now();
      const processedUrl = processUrl(url);
      
      // Preparar headers
      const requestHeaders: { [key: string]: string } = {};
      headers.forEach(header => {
        if (header.enabled && header.key && header.value) {
          // Processar variáveis nos headers
          let processedValue = header.value;
          Object.entries(environment).forEach(([key, value]) => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            processedValue = processedValue.replace(regex, value);
          });
          requestHeaders[header.key] = processedValue;
        }
      });

      // Preparar opções do request
      const requestOptions: RequestInit = {
        method: selectedMethod,
        headers: requestHeaders,
      };

      // Adicionar body para POST, PUT, PATCH
      if (['POST', 'PUT', 'PATCH'].includes(selectedMethod) && bodyType !== 'none') {
        // Processar variáveis no body
        let processedBody = body;
        Object.entries(environment).forEach(([key, value]) => {
          const regex = new RegExp(`{{${key}}}`, 'g');
          processedBody = processedBody.replace(regex, value);
        });
        requestOptions.body = processedBody;
      }

      const response = await fetch(processedUrl, requestOptions);
      const responseText = await response.text();
      const endTime = Date.now();

      // Processar headers da resposta
      const responseHeaders: { [key: string]: string } = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      setResponse({
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
        body: responseText,
        time: endTime - startTime,
        size: new Blob([responseText]).size + ' bytes'
      });

      // Executar testes se existirem
      if (selectedRequest?.tests) {
        try {
          // Simular ambiente de testes do Postman
          const pm = {
            test: (name: string, fn: () => void) => {
              try {
                fn();
                console.log(`✅ ${name}`);
              } catch (error) {
                console.log(`❌ ${name}: ${error}`);
              }
            },
            response: {
              to: {
                have: {
                  status: (expectedStatus: number) => {
                    if (response.status !== expectedStatus) {
                      throw new Error(`Expected status ${expectedStatus}, got ${response.status}`);
                    }
                  }
                }
              },
              json: () => JSON.parse(responseText)
            },
            expect: (value: any) => ({
              to: {
                be: {
                  an: (type: string) => {
                    if (type === 'array' && !Array.isArray(value)) {
                      throw new Error(`Expected array, got ${typeof value}`);
                    }
                  }
                },
                have: {
                  property: (prop: string) => {
                    if (!(prop in value)) {
                      throw new Error(`Expected property ${prop}`);
                    }
                  }
                }
              }
            })
          };

          // Executar testes
          eval(selectedRequest.tests);
        } catch (error) {
          console.error('Erro ao executar testes:', error);
        }
      }

    } catch (error) {
      setResponse({
        status: 0,
        statusText: 'Network Error',
        headers: {},
        body: JSON.stringify({ error: error.message }, null, 2),
        time: 0,
        size: '0 bytes'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '', enabled: true }]);
  };

  const updateHeader = (index: number, field: 'key' | 'value' | 'enabled', value: string | boolean) => {
    const newHeaders = [...headers];
    newHeaders[index] = { ...newHeaders[index], [field]: value };
    setHeaders(newHeaders);
  };

  const removeHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const toggleCollection = (collectionId: string) => {
    const newExpanded = new Set(expandedCollections);
    if (newExpanded.has(collectionId)) {
      newExpanded.delete(collectionId);
    } else {
      newExpanded.add(collectionId);
    }
    setExpandedCollections(newExpanded);
  };

  const formatJson = (jsonString: string) => {
    try {
      return JSON.stringify(JSON.parse(jsonString), null, 2);
    } catch {
      return jsonString;
    }
  };

  return (
    <div className="h-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-2xl overflow-hidden shadow-2xl flex">
      {/* Sidebar - Collections */}
      <div className="w-80 bg-neutral-50 dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700 overflow-y-auto flex-shrink-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Collections</h2>
              <p className="text-sm opacity-90">{collections.length} coleções</p>
            </div>
          </div>
        </div>

        {/* Collections List */}
        <div className="p-4">
          {collections.length === 0 ? (
            <div className="text-center py-8">
              <Folder className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
              <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                Nenhuma coleção encontrada
              </p>
              <p className="text-neutral-500 dark:text-neutral-500 text-xs mt-1">
                Importe coleções via painel admin
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {collections.map((collection) => (
                <div key={collection.id} className="border border-neutral-200 dark:border-neutral-600 rounded-lg overflow-hidden">
                  {/* Collection Header */}
                  <motion.div
                    className={`p-3 cursor-pointer transition-colors duration-200 ${
                      selectedCollection?.id === collection.id
                        ? 'bg-orange-100 dark:bg-orange-900/30 border-orange-300 dark:border-orange-600'
                        : 'bg-white dark:bg-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-600'
                    }`}
                    onClick={() => {
                      setSelectedCollection(collection);
                      toggleCollection(collection.id);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: expandedCollections.has(collection.id) ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="w-4 h-4 text-neutral-500" />
                      </motion.div>
                      <Folder className="w-4 h-4 text-orange-500" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm truncate text-neutral-900 dark:text-white">
                          {collection.name}
                        </h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400">
                          {collection.requests.length} requests
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Requests List */}
                  <AnimatePresence>
                    {expandedCollections.has(collection.id) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-neutral-50 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-600">
                          {collection.requests.map((request) => (
                            <motion.div
                              key={request.id}
                              className={`p-3 cursor-pointer border-b border-neutral-200 dark:border-neutral-600 last:border-b-0 transition-colors duration-200 ${
                                selectedRequest?.id === request.id
                                  ? 'bg-blue-100 dark:bg-blue-900/30'
                                  : 'hover:bg-neutral-100 dark:hover:bg-neutral-700'
                              }`}
                              onClick={() => loadRequest(request)}
                              whileHover={{ x: 5 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 text-xs font-medium rounded ${
                                  methods.find(m => m.name === request.method)?.color
                                }`}>
                                  {request.method}
                                </span>
                                <span className="text-sm font-medium text-neutral-900 dark:text-white truncate flex-1">
                                  {request.name}
                                </span>
                              </div>
                              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 truncate font-mono">
                                {request.url}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Environment Variables */}
        {selectedCollection && selectedCollection.variables.length > 0 && (
          <div className="border-t border-neutral-200 dark:border-neutral-600 p-4">
            <h4 className="font-semibold text-sm text-neutral-900 dark:text-white mb-3">
              Environment Variables
            </h4>
            <div className="space-y-2">
              {selectedCollection.variables.map((variable, index) => (
                <div key={index} className="bg-neutral-100 dark:bg-neutral-700 p-2 rounded text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-neutral-700 dark:text-neutral-300">
                      {variable.key}
                    </span>
                    <span className="text-neutral-500 dark:text-neutral-400">
                      {variable.type}
                    </span>
                  </div>
                  <div className="text-neutral-600 dark:text-neutral-400 mt-1 truncate">
                    {variable.type === 'secret' ? '••••••••' : variable.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Request Builder Header */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">API Testing Interface</h2>
              <p className="text-sm opacity-90">
                {selectedRequest ? selectedRequest.name : 'Selecione um request'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                <History className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Request Builder */}
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-700 flex-shrink-0">
          {/* Method and URL */}
          <div className="flex gap-3 mb-6">
            <select
              value={selectedMethod}
              onChange={(e) => setSelectedMethod(e.target.value as any)}
              className="px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-medium min-w-[120px]"
            >
              {methods.map((method) => (
                <option key={method.name} value={method.name}>
                  {method.name}
                </option>
              ))}
            </select>
            
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter request URL"
              className="flex-1 px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white"
            />
            
            <motion.button
              onClick={handleSendRequest}
              disabled={isLoading || !url}
              className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              Send
            </motion.button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 mb-6">
            {[
              { id: 'request', label: 'Request', icon: Settings },
              { id: 'response', label: 'Response', icon: Eye }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-orange-500 text-white'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'request' && (
              <motion.div
                key="request"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Headers */}
                <div>
                  <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">Headers</h4>
                  <div className="space-y-2">
                    {headers.map((header, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          checked={header.enabled}
                          onChange={(e) => updateHeader(index, 'enabled', e.target.checked)}
                          className="w-4 h-4 text-orange-500"
                        />
                        <input
                          type="text"
                          value={header.key}
                          onChange={(e) => updateHeader(index, 'key', e.target.value)}
                          placeholder="Key"
                          className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm"
                        />
                        <input
                          type="text"
                          value={header.value}
                          onChange={(e) => updateHeader(index, 'value', e.target.value)}
                          placeholder="Value"
                          className="flex-1 px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm"
                        />
                        <button
                          onClick={() => removeHeader(index)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addHeader}
                      className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Add Header
                    </button>
                  </div>
                </div>

                {/* Body */}
                {['POST', 'PUT', 'PATCH'].includes(selectedMethod) && (
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">Body</h4>
                    <div className="flex gap-2 mb-3">
                      {[
                        { id: 'none', label: 'None' },
                        { id: 'json', label: 'JSON' },
                        { id: 'form-data', label: 'Form Data' },
                        { id: 'x-www-form-urlencoded', label: 'URL Encoded' }
                      ].map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setBodyType(type.id as any)}
                          className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                            bodyType === type.id
                              ? 'bg-orange-500 text-white'
                              : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                    
                    {bodyType !== 'none' && (
                      <textarea
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        placeholder="Enter request body"
                        className="w-full h-40 px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-mono text-sm resize-none"
                      />
                    )}
                  </div>
                )}

                {/* Tests */}
                {selectedRequest?.tests && (
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">Tests</h4>
                    <pre className="w-full h-32 p-4 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-auto text-sm font-mono text-neutral-900 dark:text-white">
                      {selectedRequest.tests}
                    </pre>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'response' && (
              <motion.div
                key="response"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {response ? (
                  <div className="space-y-4">
                    {/* Response Status */}
                    <div className="flex items-center gap-4 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Status:</span>
                        <span className={`px-2 py-1 rounded text-sm font-medium ${
                          response.status >= 200 && response.status < 300
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                            : response.status >= 400
                            ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                            : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                        }`}>
                          {response.status} {response.statusText}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Time:</span>
                        <span className="text-sm font-medium text-neutral-900 dark:text-white">{response.time}ms</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-neutral-600 dark:text-neutral-400">Size:</span>
                        <span className="text-sm font-medium text-neutral-900 dark:text-white">{response.size}</span>
                      </div>
                    </div>

                    {/* Response Body */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-neutral-900 dark:text-white">Response Body</h4>
                        <div className="flex gap-2">
                          <button
                            onClick={() => navigator.clipboard.writeText(response.body)}
                            className="p-2 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                            title="Copy Response"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setBody(formatJson(response.body))}
                            className="p-2 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded-lg transition-colors"
                            title="Format JSON"
                          >
                            <Code className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <pre className="w-full h-80 p-4 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-auto text-sm font-mono text-neutral-900 dark:text-white">
                        {formatJson(response.body)}
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-neutral-500 dark:text-neutral-400">
                    <Send className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Send a request to see the response here</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PostmanInterface;