import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import { User as UserType } from "@/src/types/types";
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import { toSvg } from "jdenticon";
import Link from "next/link";

type Props = {
  params: { id: string };
};

export default async function User({ params }: Props) {
  const response = await axios.get(
    `${process.env.API_BASE_URL}/user/${params.id}`
  );

  const svgString = toSvg(params?.id, 100);

  const user: UserType = await response.data.user;

  return (
    <Container>
      <Box display="flex" alignItems="center" mb={2}>
        <div
          dangerouslySetInnerHTML={{ __html: svgString }}
          style={{ width: 100, height: 100, borderRadius: "50%" }}
        />
        <Box ml={2}>
          <Typography variant="h4">{user?.username}</Typography>
          <Stack direction="row" spacing={1} mb={2}>
            {user?.tags?.map((tag: any) => (
              <Chip
                key={tag.id}
                label={tag.name}
                sx={{
                  backgroundColor: "#4141af",
                  color: "#fff",
                  borderRadius: "10px",
                }}
              />
            ))}
          </Stack>
        </Box>
      </Box>

      <Box sx={{ marginBottom: "16px" }}>
        <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>
          {user?.about}
        </ReactMarkdown>
      </Box>

      <Typography variant="h6">Для зв'язку</Typography>
      <List>
        {user?.telegram && (
          <ListItem sx={{ padding: 0 }}>
            <Link href={user?.telegram}>
              <ListItemText primary={`Telegram: ${user?.telegram}`} />
            </Link>
          </ListItem>
        )}
        {user?.linkedin && (
          <ListItem sx={{ padding: 0 }}>
            <Link href={user?.linkedin}>
              <ListItemText primary={`Linkedin: ${user?.linkedin}`} />
            </Link>
          </ListItem>
        )}
        {user?.discord && (
          <ListItem sx={{ padding: 0 }}>
            <ListItemText primary={`Discord: ${user?.discord}`} />
          </ListItem>
        )}
      </List>
    </Container>
  );
}
