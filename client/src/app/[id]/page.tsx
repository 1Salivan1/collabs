import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { projectCardType } from "@/src/types/types";
import { Typography, Chip, Stack, Box } from "@mui/material";
import Link from "next/link";

interface Props {
  params: { id: number };
}

export default async function Project({ params }: Props) {
  const response = await axios.get(
    `${process.env.API_BASE_URL}/project/${params.id}`
  );

  const project: projectCardType = response?.data?.project;

  return (
    <Box style={{ padding: "20px" }}>
      <Box mb={2}>
        <Typography variant="h4" gutterBottom>
          {project?.title}
        </Typography>
        <Stack direction="row" spacing={1} mb={2}>
          {project?.tags?.map((tag) => (
            <Chip label={tag.name} key={tag.id} />
          ))}
        </Stack>
      </Box>
      <Box mb={2} paddingLeft={2}>
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
          {project?.text || ""}
        </ReactMarkdown>
      </Box>
      <Typography variant="h6" gutterBottom>
        Контакти для зв'язку:
      </Typography>
      {!!project?.telegram && (
        <Typography variant="body1" gutterBottom mt={2}>
          <Link href={project?.telegram}>Telegram: {project?.telegram}</Link>
        </Typography>
      )}
      {!!project?.linkedin && (
        <Typography variant="body1" gutterBottom mt={2}>
          <Link href={project?.linkedin}>Linkedin: {project?.linkedin}</Link>
        </Typography>
      )}
      {!!project?.discord && (
        <Typography variant="body1" gutterBottom mt={2}>
          Discord: {project?.discord}
        </Typography>
      )}
    </Box>
  );
}
