import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";

import { useAppSelector } from "../hooks/reduxHook";

const Profile = () => {
  const userInfo = useAppSelector((state) => state.userReducer);

  return (
    <Box>
      <Grid container className="page-profile" sx={{ mt: 2 }} spacing={2}>
        <Grid item sm={12} md={4}>
          <Card>
            <CardMedia
              component="img"
              height="140"
              image={(userInfo.currentUser && userInfo.currentUser.avatar) ? userInfo.currentUser.avatar : "../../user-icon.png"}
              alt={"UserImage"}
              sx={{
                borderRadius: "50%",
                width: "145px",
                margin: "0 auto",
                mt: 3,
              }}
            />
            <CardContent sx={{ textAlign: "center" }}>
              <Typography gutterBottom variant="h5" component="div">
                {userInfo.currentUser && userInfo.currentUser.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {userInfo.currentUser && userInfo.currentUser.role}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sm={12} md={8}>
          <Card>
            <CardContent>
              <Box className="profile-info">
                <Typography className="profile-info__title" component="div">
                  User Name:
                </Typography>
                <Typography component="div" color="text.secondary">
                  {userInfo.currentUser && userInfo.currentUser.name}
                </Typography>
              </Box>
              <Divider />
              <Box className="profile-info">
                <Typography className="profile-info__title" component="div">
                  Role:
                </Typography>
                <Typography component="div" color="text.secondary">
                  {userInfo.currentUser && userInfo.currentUser.role}
                </Typography>
              </Box>
              <Divider />
              <Box className="profile-info">
                <Typography className="profile-info__title" component="div">
                  Created Time:
                </Typography>
                <Typography component="div" color="text.secondary">
                  {userInfo.currentUser && userInfo.currentUser.creationAt}
                </Typography>
              </Box>
              <Divider />
              <Box className="profile-info">
                <Typography className="profile-info__title" component="div">
                  Updated Time:
                </Typography>
                <Typography component="div" color="text.secondary">
                  {userInfo.currentUser && userInfo.currentUser.updatedAt}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
