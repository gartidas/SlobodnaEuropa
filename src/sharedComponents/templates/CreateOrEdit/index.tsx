import {
  Box,
  TextField,
  Button,
  Stack,
  Typography,
  useTheme,
  useMediaQuery,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Link,
  FormHelperText,
} from "@mui/material";
import { useAppDispatch } from "../../../store";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";
import { NAVBAR_HEIGHT } from "../../../constants";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { createArticle, updateArticle } from "../../../store/articlesSlice";
import { IArticle, IAuthor, IDomainPost } from "../../../model";

interface ICreateOrEditTemplateProps {
  authors: IAuthor[];
  selectedArticle?: IArticle;
  selectedAuthor?: IAuthor;
}

const CreateOrEditTemplate = ({
  authors,
  selectedArticle,
  selectedAuthor,
}: ICreateOrEditTemplateProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { control, handleSubmit } = useForm<IDomainPost>({
    defaultValues: {
      title: selectedArticle?.title ?? "",
      body: selectedArticle?.content ?? "",
      userId: selectedAuthor?.id ?? null,
      publicationDate: selectedArticle?.publicationDate ?? "",
    },
  });

  const onSubmit = (data: IDomainPost) => {
    if (selectedArticle) {
      dispatch(updateArticle({ ...data, id: selectedArticle.id }));
    } else {
      dispatch(createArticle(data));
    }

    navigate("/articles#no-fetch=true");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: isMobile ? "1rem 2rem" : "1rem 3rem",
        minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px - 2rem)`,
      }}
    >
      <Stack spacing={3} width="100%" maxWidth={isMobile ? "100%" : "60rem"}>
        <Link
          onClick={() => {
            navigate(`/articles${selectedArticle && `/${selectedArticle.id}`}`);
          }}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            cursor: "pointer",
            textDecoration: "none",
            color: "inherit",
            fontWeight: "500",
            fontSize: "1rem",
            alignSelf: "flex-end",
          }}
        >
          <ArrowBackIcon fontSize="small" />
          Back to Article{!selectedArticle && "s"}
        </Link>

        <Typography variant={isMobile ? "h4" : "h3"} fontWeight="bold">
          {selectedArticle ? "Edit Article" : "Create New Article"}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2}>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Title"
                  variant="outlined"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="userId"
              control={control}
              rules={{ required: "Author is required" }}
              render={({ field, fieldState }) => {
                return (
                  <FormControl fullWidth error={!!fieldState.error}>
                    <InputLabel>Author</InputLabel>

                    <Select {...field} label="Author">
                      {authors.map((author) => (
                        <MenuItem key={author.id} value={author.id}>
                          {author.name}
                        </MenuItem>
                      ))}
                    </Select>

                    {fieldState.error && (
                      <FormHelperText>
                        {fieldState.error.message}
                      </FormHelperText>
                    )}
                  </FormControl>
                );
              }}
            />

            <Controller
              name="publicationDate"
              control={control}
              rules={{ required: "Publication Date is required" }}
              render={({ field, fieldState }) => (
                <DatePicker
                  label="Publication Date"
                  format="DD.MM.YYYY"
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(date) =>
                    field.onChange(date ? date.format("YYYY-MM-DD") : "")
                  }
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: !!fieldState.error,
                      helperText: fieldState.error?.message,
                    },
                  }}
                />
              )}
            />

            <Controller
              name="body"
              control={control}
              rules={{ required: "Content is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Content"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={6}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{ alignSelf: "flex-start" }}
            >
              {selectedArticle ? "Update Article" : "Create Article"}
            </Button>
          </Stack>
        </form>
      </Stack>
    </Box>
  );
};

export default CreateOrEditTemplate;
