import { Box } from "@mui/material";
import { Chip } from "../Chip";
import { UserData } from "../../types/user";
import { DEFAULT_GROUP } from "../../constants/groups";

interface UserChipsProps {
  email: string;
  userData?: UserData | null;
}

export const UserChips = ({ email, userData }: UserChipsProps) => {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Chip label={email} />
      {userData?.studentNumber && (
        <Box display="flex" alignItems="center" gap={1}>
          <Chip
            label={`👨‍🎓 ${userData.studentNumber}`}
            sx={{
              backgroundColor: "rgba(76, 175, 80, 0.2)",
              borderColor: "rgba(76, 175, 80, 0.5)",
            }}
          />
          {userData.groupId && userData.groupId !== DEFAULT_GROUP && (
            <Chip
              label={userData.groupId}
              sx={{
                backgroundColor: "rgba(255, 152, 0, 0.2)",
                borderColor: "rgba(255, 152, 0, 0.5)",
              }}
            />
          )}
          {userData.studentNumber && (
            <Chip
              label={`№ ${userData.studentNumber}`}
              sx={{
                backgroundColor: "rgba(156, 39, 176, 0.2)",
                borderColor: "rgba(156, 39, 176, 0.5)",
              }}
            />
          )}
        </Box>
      )}
    </Box>
  );
};
