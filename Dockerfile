FROM httpd:alpine

RUN sed -i '/LoadModule rewrite_module/s/^#//g' /usr/local/apache2/conf/httpd.conf && \
    sed -i '/LoadModule autoindex_module/s/^#//g' /usr/local/apache2/conf/httpd.conf && \
    sed -i '/LoadModule dir_module/s/^#//g' /usr/local/apache2/conf/httpd.conf

WORKDIR /usr/local/apache2/htdocs

COPY .theme /usr/local/apache2/htdocs/.theme
COPY .htaccess /usr/local/apache2/htdocs/.htaccess
RUN rm index.html

RUN printf '%s\n' \
    '<Directory "/usr/local/apache2/htdocs">' \
    '    Options +Indexes +FollowSymLinks' \
    '    IndexOptions FancyIndexing' \
    '    AllowOverride All' \
    '    Require all granted' \
    '</Directory>' \
    'DirectoryIndex disabled' \
    'IndexIgnore .??* *~ *# HEADER* README* RCS CVS *,v *,t' > /usr/local/apache2/conf/extra/gallery.conf

RUN echo 'Include conf/extra/gallery.conf' >> /usr/local/apache2/conf/httpd.conf

EXPOSE 80