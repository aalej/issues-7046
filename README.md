# Repro for issue 7064

## Steps to reproduce

1. Run `firebase deploy --project PROJECT_ID`
1. Run `curl 'https://us-central1-PROJECT_ID.cloudfunctions.net/SSR_FUNCTION/api/login' -F email="my@domain.com" -F password="pass123" -v`
   - Results in 500 response code

```
*   Trying 216.239.36.54:443...
* Connected to us-central1-PROJECT_ID.cloudfunctions.net (216.239.36.54) port 443
* ALPN: curl offers h2,http/1.1
* (304) (OUT), TLS handshake, Client hello (1):
*  CAfile: /etc/ssl/cert.pem
*  CApath: none
* (304) (IN), TLS handshake, Server hello (2):
* (304) (IN), TLS handshake, Unknown (8):
* (304) (IN), TLS handshake, Certificate (11):
* (304) (IN), TLS handshake, CERT verify (15):
* (304) (IN), TLS handshake, Finished (20):
* (304) (OUT), TLS handshake, Finished (20):
* SSL connection using TLSv1.3 / AEAD-AES256-GCM-SHA384
* ALPN: server accepted h2
* Server certificate:
*  subject: CN=misc.google.com
*  start date: Apr  8 06:40:24 2024 GMT
*  expire date: Jul  1 06:40:23 2024 GMT
*  subjectAltName: host "us-central1-PROJECT_ID.cloudfunctions.net" matched cert's "*.cloudfunctions.net"
*  issuer: C=US; O=Google Trust Services LLC; CN=GTS CA 1C3
*  SSL certificate verify ok.
* using HTTP/2
* [HTTP/2] [1] OPENED stream for https://us-central1-PROJECT_ID.cloudfunctions.net/SSR_FUNCTION/api/login
* [HTTP/2] [1] [:method: POST]
* [HTTP/2] [1] [:scheme: https]
* [HTTP/2] [1] [:authority: us-central1-PROJECT_ID.cloudfunctions.net]
* [HTTP/2] [1] [:path: /SSR_FUNCTION/api/login]
* [HTTP/2] [1] [user-agent: curl/8.4.0]
* [HTTP/2] [1] [accept: */*]
* [HTTP/2] [1] [content-length: 275]
* [HTTP/2] [1] [content-type: multipart/form-data; boundary=------------------------pEUlJn1N3RvIpFH8HVNZuQ]
> POST /SSR_FUNCTION/api/login HTTP/2
> Host: us-central1-PROJECT_ID.cloudfunctions.net
> User-Agent: curl/8.4.0
> Accept: */*
> Content-Length: 275
> Content-Type: multipart/form-data; boundary=------------------------pEUlJn1N3RvIpFH8HVNZuQ
>
* We are completely uploaded and fine
< HTTP/2 500
< x-cloud-trace-context: 44f7226b1bd8c75de032ea0a23211586;o=1
< date: Fri, 26 Apr 2024 13:53:40 GMT
< content-type: text/html
< server: Google Frontend
< content-length: 0
< alt-svc: h3=":443"; ma=2592000,h3-29=":443"; ma=2592000
<
* Connection #0 to host us-central1-PROJECT_ID.cloudfunctions.net left intact
```

## Notes

Created a API for testing if POST works(it works). API is in `/api/test.ts`. It can be called using cURL

1. Run `curl https://PROJECT_ID.web.app/api/test --request POST --header "Content-Type: application/json" --data '{"email":"fake@fake.fake","password":"some.fake.pass"}'`
   - Responds with

```
{"email":"fake@fake.fake","password":"some.fake.pass","status":"ok"}
```
