import { Box, Button, Typography } from "@mui/material";
import { ChangeEvent, DragEvent, useState } from "react";

export function FolderDropzone() {
  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const items = event.dataTransfer.items;
    if (items) {
      const filesArray = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === "file") {
          const file = item.getAsFile();
          if (file) {
            filesArray.push(file);
          }
        }
      }
      setFiles(filesArray);
      console.log(filesArray, "-----------filesArray");
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const filesArray = Array.from(files);
    setFiles(filesArray);
    console.log(filesArray, "-----------filesArray");
  };

  return (
    <Box
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      sx={{
        border: "2px dashed grey",
        borderRadius: 2,
        padding: 4,
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Перетащите папку или выберите вручную
      </Typography>

      <Button variant="contained" component="label">
        Выбрать папку
        <input
          type="file"
          multiple
          hidden
          ref={(input) => {
            if (input) {
              input.setAttribute("webkitdirectory", "true");
              input.setAttribute("directory", "true");
            }
          }}
          onChange={handleInputChange}
        />
      </Button>

      <Box mt={2}>
        {files.length > 0 && (
          <>
            <Typography variant="subtitle1">Загруженные файлы:</Typography>
            <ul>
              {files.map((file, idx) => (
                <li className="item" key={idx}>
                  <p>{file.webkitRelativePath || file.name}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </Box>
    </Box>
  );
}
