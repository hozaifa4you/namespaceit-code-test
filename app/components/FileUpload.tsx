import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "@mantine/core";
import { CldUploadWidget } from "next-cloudinary";
import { IconPlus } from "@tabler/icons-react";

const FileUpload = ({
  setImage,
}: {
  setImage: Dispatch<
    SetStateAction<{
      url: string;
      name: string;
    }>
  >;
}) => {
  const [issMounted, setIssMounted] = useState(false);
  const onUpload = (result: any) => {
    setImage({ name: result?.info?.original_filename, url: result?.info?.url });
  };

  useEffect(() => {
    setIssMounted(true);
  }, []);

  if (!issMounted) return null;

  return (
    <CldUploadWidget onUpload={onUpload} uploadPreset="mwnzpksg">
      {({ open }) => {
        const onClick = () => {
          open();
        };

        return (
          <Button
            leftSection={<IconPlus />}
            type="button"
            disabled={false}
            variant="secondary"
            onClick={onClick}
            size="xl"
          >
            Upload an Image
          </Button>
        );
      }}
    </CldUploadWidget>
  );
};

export default FileUpload;
