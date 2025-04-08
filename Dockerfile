# Usa nginx para servir el sitio
FROM nginx:alpine

# Elimina la página por defecto de nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia los archivos de tu proyecto a la carpeta pública de nginx
COPY . /usr/share/nginx/html

# Expone el puerto por donde nginx sirve el sitio
EXPOSE 80

