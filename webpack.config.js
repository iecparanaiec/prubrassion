const webpack = require("webpack");
const path = require("path");
const externals = require("webpack-node-externals");

module.exports = [
  /**
   * Configuración para el Servidor (Node.js)
   */
  {
    name: "server",
    mode: "development",
    entry: ["@babel/polyfill", "./src/server/index.js"], // Punto de entrada del servidor
    target: "node",
    externals: [externals()], // Evita empaquetar node_modules
    output: {
      path: path.resolve(__dirname, "dist"), // Directorio de salida
      filename: "server.js", // Archivo de salida del servidor
      libraryTarget: "commonjs2", // Especificación para Node.js
    },
    resolve: {
      extensions: [".js", ".json"], // Archivos permitidos
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"], // Transpilador Babel
            },
          },
        },
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(), // HMR para el servidor
    ],
  },

  /**
   * Configuración para el Cliente (Frontend)
   */
  {
    name: "client",
    mode: "development",
    entry: {
      calendar: path.resolve(__dirname, "src/assets/js/calendar.js"),
      clientes: path.resolve(__dirname, "src/assets/js/clientes.js"),
      scriptInicio: path.resolve(__dirname, "src/assets/js/script-inicio.js"),
      script: path.resolve(__dirname, "src/assets/js/script.js"),
      areaTecnica: path.resolve(__dirname, "src/assets/js/area_tecnica.js"),
      vendedores: path.resolve(__dirname, "src/assets/js/vendedores.js"),
      turnos:     path.resolve(__dirname, "src/assets/js/turnos.js"),
      promociones:path.resolve(__dirname, "src/assets/js/promociones.js"),
      ventas: path.resolve(__dirname, 'src/assets/js/ventas.js'),
      login: path.resolve(__dirname, 'src/assets/js/login.js'),
      gventas: path.resolve(__dirname, 'src/assets/js/g-ventas.js')
      
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].bundle.js"
    },
    
   

    
    resolve: {
      extensions: [".js", ".css", ".json"],
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"], // Carga archivos CSS
        },
        {
          test: /\.(png|jpg|jpeg|svg|gif|ico)$/i,
          type: "asset/resource", // Carga imágenes y recursos
          generator: {
            filename: "assets/icons/[name][ext]", // Ubicación de salida para imágenes
          },
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(), // HMR para cliente
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"), // Directorio de archivos servidos
      },
      compress: true,
      port: 3002, // Puerto para servir el frontend
      hot: true, // Recarga en caliente
    },
  },
];
