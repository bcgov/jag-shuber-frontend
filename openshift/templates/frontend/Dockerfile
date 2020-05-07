FROM frontend-artifacts:latest as builder

FROM nginx-runtime:latest

# Copy build results
COPY --from=builder /opt/app-root/src/dist app/dist
CMD  /usr/libexec/s2i/run