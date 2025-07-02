import React, { useState, useEffect } from 'react';
import { Send, Plus, Trash2, Copy, Download, Save, Play, Settings, Eye, Code, History, Folder, Search, X, ChevronDown, ChevronRight, AlertCircle, CheckCircle, Upload, FileText, UploadCloud as CloudUpload } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PostmanCollection {
  id: string;
  name: string;
  description: string;
  requests: PostmanRequest[];
  variables: PostmanVariable[];
  createdAt: string;
  updatedAt: string;
  isImported?: boolean;
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
  
  // Upload states
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadMessage, setUploadMessage] = useState('');

  // Coleções reais funcionais
  const realCollections: PostmanCollection[] = [
    {
      id: '1',
      name: 'JSONPlaceholder API Tests',
      description: 'Testes completos da API JSONPlaceholder para demonstração',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20',
      variables: [
        { key: 'baseUrl', value: 'https://jsonplaceholder.typicode.com', type: 'default' },
        { key: 'userId', value: '1', type: 'default' }
      ],
      requests: [
        {
          id: 'req1',
          name: 'Get All Posts',
          method: 'GET',
          url: '{{baseUrl}}/posts',
          headers: [
            { key: 'Accept', value: 'application/json', enabled: true }
          ],
          body: '',
          bodyType: 'none',
          description: 'Busca todos os posts disponíveis',
          tests: `
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response is an array", function () {
    pm.expect(pm.response.json()).to.be.an('array');
});

pm.test("Posts have required fields", function () {
    const posts = pm.response.json();
    pm.expect(posts[0]).to.have.property('id');
    pm.expect(posts[0]).to.have.property('title');
    pm.expect(posts[0]).to.have.property('body');
});`
        },
        {
          id: 'req2',
          name: 'Get Single Post',
          method: 'GET',
          url: '{{baseUrl}}/posts/{{userId}}',
          headers: [
            { key: 'Accept', value: 'application/json', enabled: true }
          ],
          body: '',
          bodyType: 'none',
          description: 'Busca um post específico por ID',
          tests: `
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Post has correct structure", function () {
    const post = pm.response.json();
    pm.expect(post).to.have.property('id');
    pm.expect(post).to.have.property('userId');
    pm.expect(post).to.have.property('title');
    pm.expect(post).to.have.property('body');
});`
        },
        {
          id: 'req3',
          name: 'Create New Post',
          method: 'POST',
          url: '{{baseUrl}}/posts',
          headers: [
            { key: 'Content-Type', value: 'application/json', enabled: true },
            { key: 'Accept', value: 'application/json', enabled: true }
          ],
          body: JSON.stringify({
            title: 'Teste QA - Novo Post',
            body: 'Este é um post criado durante os testes de QA da API',
            userId: 1
          }, null, 2),
          bodyType: 'json',
          description: 'Cria um novo post via API',
          tests: `
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("Post was created with ID", function () {
    const newPost = pm.response.json();
    pm.expect(newPost).to.have.property('id');
    pm.expect(newPost.title).to.eql('Teste QA - Novo Post');
});`
        },
        {
          id: 'req4',
          name: 'Update Post',
          method: 'PUT',
          url: '{{baseUrl}}/posts/1',
          headers: [
            { key: 'Content-Type', value: 'application/json', enabled: true }
          ],
          body: JSON.stringify({
            id: 1,
            title: 'Post Atualizado - QA Test',
            body: 'Conteúdo atualizado durante teste de QA',
            userId: 1
          }, null, 2),
          bodyType: 'json',
          description: 'Atualiza um post existente'
        },
        {
          id: 'req5',
          name: 'Delete Post',
          method: 'DELETE',
          url: '{{baseUrl}}/posts/1',
          headers: [],
          body: '',
          bodyType: 'none',
          description: 'Remove um post específico',
          tests: `
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});`
        }
      ]
    },
    {
      id: '2',
      name: 'ReqRes API Tests',
      description: 'Testes de autenticação e usuários com ReqRes API',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18',
      variables: [
        { key: 'reqresUrl', value: 'https://reqres.in/api', type: 'default' },
        { key: 'authToken', value: '', type: 'secret' }
      ],
      requests: [
        {
          id: 'req6',
          name: 'List Users',
          method: 'GET',
          url: '{{reqresUrl}}/users?page=2',
          headers: [
            { key: 'Accept', value: 'application/json', enabled: true }
          ],
          body: '',
          bodyType: 'none',
          description: 'Lista usuários com paginação',
          tests: `
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Response has pagination", function () {
    const response = pm.response.json();
    pm.expect(response).to.have.property('page');
    pm.expect(response).to.have.property('data');
    pm.expect(response.data).to.be.an('array');
});`
        },
        {
          id: 'req7',
          name: 'Create User',
          method: 'POST',
          url: '{{reqresUrl}}/users',
          headers: [
            { key: 'Content-Type', value: 'application/json', enabled: true }
          ],
          body: JSON.stringify({
            name: 'Esther Gabrielle',
            job: 'QA Tester'
          }, null, 2),
          bodyType: 'json',
          description: 'Cria um novo usuário',
          tests: `
pm.test("Status code is 201", function () {
    pm.response.to.have.status(201);
});

pm.test("User created successfully", function () {
    const user = pm.response.json();
    pm.expect(user).to.have.property('id');
    pm.expect(user).to.have.property('createdAt');
    pm.expect(user.name).to.eql('Esther Gabrielle');
});`
        },
        {
          id: 'req8',
          name: 'Login User',
          method: 'POST',
          url: '{{reqresUrl}}/login',
          headers: [
            { key: 'Content-Type', value: 'application/json', enabled: true }
          ],
          body: JSON.stringify({
            email: 'eve.holt@reqres.in',
            password: 'cityslicka'
          }, null, 2),
          bodyType: 'json',
          description: 'Autentica usuário e obtém token',
          tests: `
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Token is returned", function () {
    const response = pm.response.json();
    pm.expect(response).to.have.property('token');
    
    // Salva o token para uso em outras requisições
    pm.environment.set("authToken", response.token);
});`
        }
      ]
    },
    {
      id: '3',
      name: 'HTTP Status Tests',
      description: 'Testes de diferentes códigos de status HTTP',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-19',
      variables: [
        { key: 'httpbinUrl', value: 'https://httpbin.org', type: 'default' }
      ],
      requests: [
        {
          id: 'req9',
          name: 'Test 200 OK',
          method: 'GET',
          url: '{{httpbinUrl}}/status/200',
          headers: [],
          body: '',
          bodyType: 'none',
          description: 'Testa resposta 200 OK',
          tests: `
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});`
        },
        {
          id: 'req10',
          name: 'Test 404 Not Found',
          method: 'GET',
          url: '{{httpbinUrl}}/status/404',
          headers: [],
          body: '',
          bodyType: 'none',
          description: 'Testa resposta 404 Not Found',
          tests: `
pm.test("Status code is 404", function () {
    pm.response.to.have.status(404);
});`
        },
        {
          id: 'req11',
          name: 'Test POST with JSON',
          method: 'POST',
          url: '{{httpbinUrl}}/post',
          headers: [
            { key: 'Content-Type', value: 'application/json', enabled: true }
          ],
          body: JSON.stringify({
            testData: 'QA Testing',
            timestamp: new Date().toISOString(),
            tester: 'Esther Gabrielle'
          }, null, 2),
          bodyType: 'json',
          description: 'Testa POST com dados JSON',
          tests: `
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

pm.test("Request data is echoed back", function () {
    const response = pm.response.json();
    pm.expect(response).to.have.property('json');
    pm.expect(response.json.testData).to.eql('QA Testing');
});`
        }
      ]
    }
  ];

  // Carregar coleções na inicialização
  useEffect(() => {
    // Carregar coleções salvas do localStorage
    const savedCollections = localStorage.getItem('postman_imported_collections');
    const importedCollections = savedCollections ? JSON.parse(savedCollections) : [];
    
    // Combinar coleções reais com importadas
    const allCollections = [...realCollections, ...importedCollections];
    setCollections(allCollections);
    
    // Auto-selecionar primeira coleção
    if (allCollections.length > 0) {
      setSelectedCollection(allCollections[0]);
      setExpandedCollections(new Set([allCollections[0].id]));
      
      // Auto-selecionar primeiro request
      if (allCollections[0].requests.length > 0) {
        loadRequest(allCollections[0].requests[0]);
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

  // Função para processar arquivo de coleção do Postman
  const parsePostmanCollection = (fileContent: string): PostmanCollection | null => {
    try {
      const data = JSON.parse(fileContent);
      
      // Verificar se é um arquivo de coleção válido do Postman
      if (!data.info || !data.item) {
        throw new Error('Formato de coleção inválido');
      }

      // Processar requests recursivamente
      const processItems = (items: any[]): PostmanRequest[] => {
        const requests: PostmanRequest[] = [];
        
        items.forEach((item, index) => {
          if (item.item) {
            // É uma pasta, processar recursivamente
            requests.push(...processItems(item.item));
          } else if (item.request) {
            // É um request
            const request = item.request;
            const url = typeof request.url === 'string' ? request.url : request.url?.raw || '';
            
            // Processar headers
            const headers = request.header ? request.header.map((h: any) => ({
              key: h.key || '',
              value: h.value || '',
              enabled: !h.disabled
            })) : [];

            // Processar body
            let body = '';
            let bodyType: 'none' | 'json' | 'form-data' | 'x-www-form-urlencoded' = 'none';
            
            if (request.body) {
              if (request.body.mode === 'raw') {
                body = request.body.raw || '';
                bodyType = 'json';
              } else if (request.body.mode === 'formdata') {
                bodyType = 'form-data';
              } else if (request.body.mode === 'urlencoded') {
                bodyType = 'x-www-form-urlencoded';
              }
            }

            // Processar testes
            let tests = '';
            if (item.event) {
              const testEvent = item.event.find((e: any) => e.listen === 'test');
              if (testEvent && testEvent.script && testEvent.script.exec) {
                tests = testEvent.script.exec.join('\n');
              }
            }

            requests.push({
              id: `imported_${Date.now()}_${index}`,
              name: item.name || 'Unnamed Request',
              method: request.method || 'GET',
              url,
              headers,
              body,
              bodyType,
              description: request.description || item.description || '',
              tests: tests || undefined
            });
          }
        });
        
        return requests;
      };

      // Processar variáveis
      const variables: PostmanVariable[] = [];
      if (data.variable) {
        data.variable.forEach((v: any) => {
          variables.push({
            key: v.key || '',
            value: v.value || '',
            type: v.type === 'secret' ? 'secret' : 'default'
          });
        });
      }

      const collection: PostmanCollection = {
        id: `imported_${Date.now()}`,
        name: data.info.name || 'Coleção Importada',
        description: data.info.description || 'Coleção importada do Postman',
        requests: processItems(data.item),
        variables,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isImported: true
      };

      return collection;
    } catch (error) {
      console.error('Erro ao processar coleção:', error);
      return null;
    }
  };

  // Função para fazer upload da coleção
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploadStatus('uploading');
    setUploadMessage('Processando arquivo...');

    try {
      const fileContent = await file.text();
      const collection = parsePostmanCollection(fileContent);

      if (!collection) {
        throw new Error('Arquivo de coleção inválido');
      }

      // Salvar no localStorage
      const savedCollections = localStorage.getItem('postman_imported_collections');
      const importedCollections = savedCollections ? JSON.parse(savedCollections) : [];
      importedCollections.push(collection);
      localStorage.setItem('postman_imported_collections', JSON.stringify(importedCollections));

      // Atualizar estado
      const allCollections = [...realCollections, ...importedCollections];
      setCollections(allCollections);

      // Selecionar a coleção importada
      setSelectedCollection(collection);
      setExpandedCollections(new Set([collection.id]));
      
      if (collection.requests.length > 0) {
        loadRequest(collection.requests[0]);
      }

      setUploadStatus('success');
      setUploadMessage(`Coleção "${collection.name}" importada com sucesso! ${collection.requests.length} requests carregados.`);
      
      setTimeout(() => {
        setShowUploadModal(false);
        setUploadStatus('idle');
        setUploadMessage('');
      }, 2000);

    } catch (error) {
      setUploadStatus('error');
      setUploadMessage(`Erro ao importar: ${error.message}`);
    }

    // Reset input
    event.target.value = '';
  };

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
    setHeaders([...(request.headers || []), { key: '', value: '', enabled: true }]);
    setBody(request.body);
    setBodyType(request.bodyType);
    setResponse(null);
    setActiveTab('request');
  };

  // Enviar request REAL
  const handleSendRequest = async () => {
    setIsLoading(true);
    setActiveTab('response');
    
    try {
      const startTime = Date.now();
      const processedUrl = processUrl(url);
      
      console.log('Enviando request para:', processedUrl);
      
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
        mode: 'cors',
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

      console.log('Request options:', requestOptions);

      const response = await fetch(processedUrl, requestOptions);
      const responseText = await response.text();
      const endTime = Date.now();

      console.log('Response recebida:', response.status, response.statusText);

      // Processar headers da resposta
      const responseHeaders: { [key: string]: string } = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });

      // Calcular tamanho da resposta
      const responseSize = new Blob([responseText]).size;
      const sizeFormatted = responseSize > 1024 
        ? `${(responseSize / 1024).toFixed(2)} KB`
        : `${responseSize} bytes`;

      setResponse({
        status: response.status,
        statusText: response.statusText,
        headers: responseHeaders,
        body: responseText,
        time: endTime - startTime,
        size: sizeFormatted
      });

      // Executar testes se existirem
      if (selectedRequest?.tests) {
        try {
          console.log('Executando testes...');
          
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
              json: () => {
                try {
                  return JSON.parse(responseText);
                } catch {
                  throw new Error('Response is not valid JSON');
                }
              }
            },
            expect: (value: any) => ({
              to: {
                be: {
                  an: (type: string) => {
                    if (type === 'array' && !Array.isArray(value)) {
                      throw new Error(`Expected array, got ${typeof value}`);
                    }
                    if (type === 'object' && (typeof value !== 'object' || Array.isArray(value))) {
                      throw new Error(`Expected object, got ${typeof value}`);
                    }
                  }
                },
                have: {
                  property: (prop: string) => {
                    if (!(prop in value)) {
                      throw new Error(`Expected property ${prop}`);
                    }
                    return {
                      eql: (expectedValue: any) => {
                        if (value[prop] !== expectedValue) {
                          throw new Error(`Expected ${prop} to equal ${expectedValue}, got ${value[prop]}`);
                        }
                      }
                    };
                  }
                }
              }
            }),
            environment: {
              set: (key: string, value: string) => {
                setEnvironment(prev => ({ ...prev, [key]: value }));
                console.log(`Environment variable set: ${key} = ${value}`);
              }
            }
          };

          // Executar testes
          eval(selectedRequest.tests);
        } catch (error) {
          console.error('Erro ao executar testes:', error);
        }
      }

    } catch (error) {
      console.error('Erro na requisição:', error);
      setResponse({
        status: 0,
        statusText: 'Network Error',
        headers: {},
        body: JSON.stringify({ 
          error: 'Erro de rede ou CORS',
          message: error.message,
          details: 'Verifique se a URL está correta e se o servidor permite requisições CORS'
        }, null, 2),
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Send className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Collections</h2>
                <p className="text-sm opacity-90">{collections.length} coleções</p>
              </div>
            </div>
            
            {/* Upload Button */}
            <motion.button
              onClick={() => setShowUploadModal(true)}
              className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors duration-300 flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Importar Coleção"
            >
              <Upload className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Collections List */}
        <div className="p-4">
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
                        {collection.isImported && (
                          <span className="ml-2 text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 px-2 py-0.5 rounded-full">
                            Importada
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">
                        {collection.requests.length} requests
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" title="Funcional" />
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">LIVE</span>
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
                {selectedRequest ? selectedRequest.name : 'Selecione um request para começar'}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs font-medium">Sistema Funcional</span>
              </div>
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
              placeholder="Enter request URL (ex: {{baseUrl}}/posts)"
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
                        placeholder="Enter request body (JSON format)"
                        className="w-full h-40 px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-mono text-sm resize-none"
                      />
                    )}
                  </div>
                )}

                {/* Tests */}
                {selectedRequest?.tests && (
                  <div>
                    <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">Tests (Auto-executados)</h4>
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
                        <span className={`px-3 py-1 rounded text-sm font-medium ${
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

                    {/* Response Headers */}
                    <div>
                      <h4 className="font-semibold text-neutral-900 dark:text-white mb-3">Response Headers</h4>
                      <div className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg p-4">
                        {Object.entries(response.headers).map(([key, value]) => (
                          <div key={key} className="flex justify-between py-1 border-b border-neutral-200 dark:border-neutral-700 last:border-b-0">
                            <span className="font-medium text-neutral-700 dark:text-neutral-300">{key}:</span>
                            <span className="text-neutral-600 dark:text-neutral-400 font-mono text-sm">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-neutral-500 dark:text-neutral-400">
                    <Send className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg mb-2">Envie um request para ver a resposta</p>
                    <p className="text-sm">As requisições são enviadas para APIs reais e funcionais</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-neutral-800 rounded-3xl p-8 max-w-md w-full shadow-2xl border border-neutral-200 dark:border-neutral-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <CloudUpload className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-poppins font-bold text-neutral-900 dark:text-white mb-2">
                  Importar Coleção
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 font-inter">
                  Faça upload do arquivo JSON da sua coleção do Postman
                </p>
              </div>

              {uploadStatus === 'idle' && (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-neutral-300 dark:border-neutral-600 rounded-2xl p-8 text-center hover:border-orange-400 transition-colors duration-300">
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="collection-upload"
                    />
                    <label
                      htmlFor="collection-upload"
                      className="cursor-pointer flex flex-col items-center gap-3"
                    >
                      <FileText className="w-12 h-12 text-neutral-400" />
                      <div>
                        <p className="font-semibold text-neutral-900 dark:text-white">
                          Clique para selecionar arquivo
                        </p>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          Ou arraste e solte aqui
                        </p>
                      </div>
                      <p className="text-xs text-neutral-400">
                        Apenas arquivos .json do Postman
                      </p>
                    </label>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      Como exportar do Postman:
                    </h4>
                    <ol className="text-sm text-blue-800 dark:text-blue-300 space-y-1 list-decimal list-inside">
                      <li>Abra o Postman</li>
                      <li>Clique nos "..." da coleção</li>
                      <li>Selecione "Export"</li>
                      <li>Escolha "Collection v2.1"</li>
                      <li>Salve o arquivo .json</li>
                    </ol>
                  </div>
                </div>
              )}

              {uploadStatus === 'uploading' && (
                <div className="text-center py-8">
                  <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-neutral-600 dark:text-neutral-300 font-inter">
                    {uploadMessage}
                  </p>
                </div>
              )}

              {uploadStatus === 'success' && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <p className="text-green-600 dark:text-green-400 font-inter font-semibold">
                    {uploadMessage}
                  </p>
                </div>
              )}

              {uploadStatus === 'error' && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                  </div>
                  <p className="text-red-600 dark:text-red-400 font-inter font-semibold mb-4">
                    {uploadMessage}
                  </p>
                  <button
                    onClick={() => {
                      setUploadStatus('idle');
                      setUploadMessage('');
                    }}
                    className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                  >
                    Tentar Novamente
                  </button>
                </div>
              )}

              {uploadStatus === 'idle' && (
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 py-3 rounded-xl font-semibold hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PostmanInterface;