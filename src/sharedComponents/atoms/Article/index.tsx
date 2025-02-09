import { Paper, Stack, Typography } from "@mui/material";
import { IArticle, IAuthor } from "../../../model";
import { useNavigate } from "react-router";
import dayjs from "dayjs";

interface IArticleProps {
  article: IArticle;
  author?: IAuthor;
}

const Article = ({ article, author }: IArticleProps) => {
  const navigate = useNavigate();

  return (
    <Paper
      elevation={3}
      sx={{
        width: "20rem",
        padding: "1.5rem",
        borderRadius: "1rem",
        backgroundColor: "#fff",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s",
        cursor: "pointer",
        position: "relative",

        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
        },
      }}
      onClick={() => navigate(`/articles/${article.id}`)}
    >
      <Stack spacing="0.75rem">
        <Typography variant="subtitle2" color="text.secondary">
          {dayjs(article.publicationDate).format("DD.MM.YYYY")}
        </Typography>

        <Typography variant="h5" fontWeight="bold">
          {article.title}
        </Typography>

        {author && (
          <Typography variant="body1" color="text.secondary">
            by {author.name}
          </Typography>
        )}

        <Typography
          variant="body2"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {article.content}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default Article;
