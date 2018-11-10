openssl genrsa -out rootCA.key 2048
openssl req -x509 -new -nodes -key rootCA.key  -sha256 -days 1024 -out rootCA.pem
read -p 'Press any key in the next five seconds...'
openssl genrsa -out server.key 2048
SUBJECT= "/C=CA/ST=None/L=NB/O=None/CN=localhost"
openssl req -new -key server.key -subj -nodes "$SUBJECT" -out server.csr
read -p '!!!!Press any key in the next five seconds...'
openssl x509 -req -in server.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out server.crt -days 1000 -extfile v3.ext

read -p 'Press any key in the next five seconds...'