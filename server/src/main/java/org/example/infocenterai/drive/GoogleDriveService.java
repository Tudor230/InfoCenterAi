package org.example.infocenterai.drive;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.UserCredentials;
import com.google.auth.http.HttpCredentialsAdapter;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.model.FileList;
import org.example.infocenterai.drive.dto.DriveFileResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.security.GeneralSecurityException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class GoogleDriveService {

    @Value("${google.drive.application-name}")
    private String applicationName;

    @Value("${GOOGLE_CREDENTIALS_BASE64}")
    private String credentialsBase64;

    @Value("${GOOGLE_REFRESH_TOKEN}")
    private String refreshToken;

    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    private static final List<String> SCOPES = Collections.singletonList(DriveScopes.DRIVE);

    public Drive getDriveService() throws IOException, GeneralSecurityException {
        final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
        final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();

        // 1. Decode your Base64 credentials.json
        byte[] decodedJson = java.util.Base64.getDecoder().decode(credentialsBase64);

        // 2. Load the Client Secrets from the decoded JSON
        GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(
                JSON_FACTORY,
                new java.io.InputStreamReader(new java.io.ByteArrayInputStream(decodedJson))
        );

        // 3. Build the modern UserCredentials (the replacement for GoogleCredential)
        // We get the ID and Secret from the JSON and manually add the Refresh Token
        GoogleCredentials credentials = UserCredentials.newBuilder()
                .setClientId(clientSecrets.getDetails().getClientId())
                .setClientSecret(clientSecrets.getDetails().getClientSecret())
                .setRefreshToken(refreshToken)
                .build();

        // 4. Use HttpCredentialsAdapter to bridge to the Drive Builder
        return new Drive.Builder(HTTP_TRANSPORT, JSON_FACTORY, new HttpCredentialsAdapter(credentials))
                .setApplicationName("InfoCenterAi")
                .build();
    }

    public String uploadFile(org.springframework.web.multipart.MultipartFile multipartFile, String folderId) throws IOException, GeneralSecurityException {
        Drive driveService = getDriveService();

        com.google.api.services.drive.model.File fileMetadata = new com.google.api.services.drive.model.File();
        fileMetadata.setName(multipartFile.getOriginalFilename());

        if (folderId != null && !folderId.isEmpty()) {
            fileMetadata.setParents(Collections.singletonList(folderId));
        }

        com.google.api.client.http.InputStreamContent mediaContent = new com.google.api.client.http.InputStreamContent(
                multipartFile.getContentType(),
                multipartFile.getInputStream()
        );

        com.google.api.services.drive.model.File file = driveService.files().create(fileMetadata, mediaContent)
                .setFields("id")
                .execute();

        return file.getId();
    }

    public com.google.api.services.drive.model.File getFileMetadata(String fileId) throws IOException, GeneralSecurityException {
        Drive service = getDriveService();
        return service.files().get(fileId).execute();
    }

    public void downloadFile(String fileId, OutputStream outputStream) throws IOException, GeneralSecurityException {
        Drive service = getDriveService();
        service.files().get(fileId).executeMediaAndDownloadTo(outputStream);
    }

    public List<DriveFileResponse> listFiles(String folderId) throws IOException, GeneralSecurityException {
        Drive service = getDriveService();
        String query = "'" + folderId + "' in parents and trashed = false";

        FileList result = service.files().list()
                .setQ(query).setFields("nextPageToken, files(id, name, size, createdTime, webViewLink)")
                .execute();

        List<DriveFileResponse> files = new ArrayList<>();
        if (result.getFiles() != null) {
            for (com.google.api.services.drive.model.File file : result.getFiles()) {
                LocalDateTime createdTime = null;
                if (file.getCreatedTime() != null) {
                    createdTime = LocalDateTime.ofInstant(
                            Instant.ofEpochMilli(file.getCreatedTime().getValue()),
                            ZoneId.systemDefault());
                }

                files.add(new DriveFileResponse(
                        file.getId(),
                        file.getName(),
                        file.getSize(),
                        createdTime,
                        file.getWebViewLink()
                ));
            }
        }
        return files;
    }
}
