# 🌐 Echo Chamber - Guía de Uso del Servidor Web

## ✅ El servidor SÍ está funcionando

He verificado que el servidor está activo y todos los endpoints funcionan correctamente.

## 🚀 Cómo usar la interfaz web

### Opción 1: Iniciar el servidor desde cero

```bash
cd /workspaces/CopilotAdventures/echo-chamber
npm start
```

O directamente:
```bash
node server.js
```

Deberías ver:
```
======================================================================
✨ ECHO CHAMBER WEB SERVER STARTED ✨
======================================================================

🌐 Server running at: http://localhost:3000
📍 Open in your browser: http://localhost:3000
```

### Opción 2: Acceder si el servidor ya está corriendo

Si el servidor ya está ejecutándose en otro terminal:

**En VS Code:**
1. Abre la Command Palette (Ctrl+Shift+P o Cmd+Shift+P)
2. Escribe: "Simple Browser: Show"
3. Ingresa: `http://localhost:3000`

**O en tu navegador:**
- Abre: `http://localhost:3000`

### Opción 3: Usar la API REST directamente

```bash
# Health check
curl http://localhost:3000/api/health

# Predecir
curl -X POST http://localhost:3000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"sequence": [3, 6, 9, 12]}'

# Obtener estadísticas
curl http://localhost:3000/api/statistics

# Obtener samples
curl http://localhost:3000/api/samples
```

## 🎯 Características de la Interfaz Web

### 🔮 Pestaña Predictor
- Ingresa una secuencia (ej: 3, 6, 9, 12)
- Haz clic en "🔮 Predict Next Number"
- Verás el resultado instantáneamente

### 🧪 Pestaña Samples
- Haz clic en esta pestaña
- Verás 6 secuencias de ejemplo
- Haz clic en "🔮 Test This" para probar cualquiera

### 📚 Pestaña Memories
- Muestra todo el historial de predicciones
- Cada predicción incluye: secuencia, resultado, diferencia, timestamp
- Haz clic en "🔄 Refresh Memories" para actualizar

### 📊 Pestaña Statistics
- Muestra estadísticas generales
- Total de ecos registrados
- Promedio de diferencias
- Detalles del primer y último eco

## 🔧 Solución de problemas

### El servidor no inicia

**Error: "Port 3000 is already in use"**

```bash
# Usa un puerto diferente
PORT=3001 npm start

# O mata el proceso anterior
pkill -f "node server.js"
```

### No puedo acceder a http://localhost:3000

1. **Asegúrate que el servidor está corriendo:**
   ```bash
   ps aux | grep "node server"
   ```
   Deberías ver un proceso con `node server.js`

2. **Si no ves nada, inicia el servidor:**
   ```bash
   cd /workspaces/CopilotAdventures/echo-chamber
   npm start
   ```

3. **Abre el navegador:**
   - Dirección: `http://localhost:3000`
   - O en VS Code: Command Palette → "Simple Browser: Show"

### La interfaz carga pero no responde

1. Abre la consola del navegador (F12)
2. Ve a la pestaña "Network" y "Console"
3. Intenta ingresar una secuencia
4. Deberías ver las solicitudes al servidor

## 📡 Endpoints API disponibles

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/health` | Estado del servidor |
| POST | `/api/predict` | Predice siguiente número |
| POST | `/api/validate` | Valida una secuencia |
| GET | `/api/memories` | Obtiene todas las predicciones |
| DELETE | `/api/memories` | Limpia el historial |
| GET | `/api/statistics` | Estadísticas |
| GET | `/api/samples` | Secuencias de ejemplo |

## 💡 Tips útiles

### Ver logs del servidor en tiempo real

```bash
# En una ventana nueva
cd /workspaces/CopilotAdventures/echo-chamber
npm start
```

Verás todos los detalles de las solicitudes.

### Probar desde otro puerto

```bash
# Si 3000 está ocupado
PORT=3001 npm start

# Luego accede a:
http://localhost:3001
```

### Limpiar datos guardados

Haz clic en "🗑️ Clear All Memories" en la interfaz web.

O usa la API:
```bash
curl -X DELETE http://localhost:3000/api/memories
```

## 📚 Documentación

Para más información:
- `README-WEB.md` - Guía completa
- `README.md` - Documentación original de consola
- `WHATS_NEW.md` - Novedades de v2.0

## ✨ Resumen rápido

**Para usar la interfaz web:**

1. **Abre terminal** en `/workspaces/CopilotAdventures/echo-chamber`
2. **Ejecuta:** `npm start`
3. **En el navegador:** `http://localhost:3000`
4. **¡Disfruta!** 🎉

---

**¿Sigue sin funcionar?** Dame más detalles:
- ¿Qué error específico ves?
- ¿En qué momento ocurre?
- ¿Qué has intentado ya?
