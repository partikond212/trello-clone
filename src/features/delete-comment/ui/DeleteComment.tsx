import type { CommentT } from "@/entities/comment/model/Comment";
import { type FC } from "react";
import useDeleteComment from "../model/useDeleteComment";
import { useNotification } from "@/app/context/NotificationContext";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";
type DeleteCommentProps = {
  comment: CommentT;
};
const DeleteComment: FC<DeleteCommentProps> = ({ comment }) => {
  const { mutate } = useDeleteComment();
  const { showNotification } = useNotification();
  const handleDeleteComment = () => {
    mutate(comment.id, {
      onSuccess: () => {
        showNotification("Вы успешно удалили коммент!", "success");
      },
      onError: (error) => {
        showNotification(
          getErrorMessage(error, "Не удалось удалить комментарий"),
          "error",
        );
      },
    });
  };
  return (
    <button onClick={handleDeleteComment}>
      <img
        src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tINCh0LrQsNGH0LDQvdC+INGBINGB0LDQudGC0LAgc3ZnNC5ydSAvIERvd25sb2FkZWQgZnJvbSBzdmc0LnJ1IC0tPgo8c3ZnIGZpbGw9IiMwMDAwMDAiIHdpZHRoPSI4MDBweCIgaGVpZ2h0PSI4MDBweCIgdmlld0JveD0iMCAwIDMyIDMyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0gMTUgNCBDIDE0LjQ3NjU2MyA0IDEzLjk0MTQwNiA0LjE4MzU5NCAxMy41NjI1IDQuNTYyNSBDIDEzLjE4MzU5NCA0Ljk0MTQwNiAxMyA1LjQ3NjU2MyAxMyA2IEwgMTMgNyBMIDcgNyBMIDcgOSBMIDggOSBMIDggMjUgQyA4IDI2LjY0NDUzMSA5LjM1NTQ2OSAyOCAxMSAyOCBMIDIzIDI4IEMgMjQuNjQ0NTMxIDI4IDI2IDI2LjY0NDUzMSAyNiAyNSBMIDI2IDkgTCAyNyA5IEwgMjcgNyBMIDIxIDcgTCAyMSA2IEMgMjEgNS40NzY1NjMgMjAuODE2NDA2IDQuOTQxNDA2IDIwLjQzNzUgNC41NjI1IEMgMjAuMDU4NTk0IDQuMTgzNTk0IDE5LjUyMzQzOCA0IDE5IDQgWiBNIDE1IDYgTCAxOSA2IEwgMTkgNyBMIDE1IDcgWiBNIDEwIDkgTCAyNCA5IEwgMjQgMjUgQyAyNCAyNS41NTQ2ODggMjMuNTU0Njg4IDI2IDIzIDI2IEwgMTEgMjYgQyAxMC40NDUzMTMgMjYgMTAgMjUuNTU0Njg4IDEwIDI1IFogTSAxMiAxMiBMIDEyIDIzIEwgMTQgMjMgTCAxNCAxMiBaIE0gMTYgMTIgTCAxNiAyMyBMIDE4IDIzIEwgMTggMTIgWiBNIDIwIDEyIEwgMjAgMjMgTCAyMiAyMyBMIDIyIDEyIFoiLz48L3N2Zz4="
        alt="Удалить"
      />
    </button>
  );
};

export default DeleteComment;
