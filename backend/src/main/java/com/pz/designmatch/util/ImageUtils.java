package com.pz.designmatch.util;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StreamUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Component
public class ImageUtils {

  @Value("${upload.path}")
  private String uploadDir;

  public byte[] getImageFromPath(String imagePath) {
    Path filePath = Paths.get(uploadDir, imagePath);
    try (InputStream inputStream = Files.newInputStream(filePath)) {
      return StreamUtils.copyToByteArray(inputStream);
    } catch (IOException e) {
      e.printStackTrace();
      return null;
    }
  }

  public String generateImagePath(MultipartFile image) {
    if (image.isEmpty()) {
      throw new IllegalArgumentException("Nie wybrano pliku");
    }

    String fileName = Objects.requireNonNull(image.getOriginalFilename());
    String extension = StringUtils.getFilenameExtension(fileName);
    List<String> allowedExtensions = Arrays.asList("jpg", "jpeg", "png");
    if (!allowedExtensions.contains(Objects.requireNonNull(extension).toLowerCase())) {
      throw new IllegalArgumentException("Plik musi mieć rozszerzenie jpg, jpeg lub png");
    }

    String sanitizedFileName = sanitizeFileName(fileName);
    String newFileName = System.currentTimeMillis() + "_" + sanitizedFileName + "." + extension;

    Path uploadsPath = Paths.get(uploadDir);
    try {
      Files.createDirectories(uploadsPath);
    } catch (IOException e) {
      throw new RuntimeException("Nie udało się utworzyć katalogu dla plików", e);
    }

    Path destinationPath = uploadsPath.resolve(newFileName);
    try {
      image.transferTo(destinationPath.toFile());
    } catch (IOException e) {
      throw new RuntimeException("Nie udało się zapisać pliku", e);
    }

    return "/images/" + newFileName;
  }

  private String sanitizeFileName(String fileName) {
    return fileName.replaceAll("[^a-zA-Z0-9\\.\\-]", "_");
  }
}
