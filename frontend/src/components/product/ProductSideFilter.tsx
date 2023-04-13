import {Box, Collapse, Divider, List} from "@mui/material";
import { Card, CardContent, Typography } from "@mui/material";
import { Category, Price } from "../../types/category";
import React, {useState} from "react";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const ProductSideFilter = (props: any) => {
  const list: Category[] = props.list;
  const priceList: Price[] = props.priceList;
  const { selectedCatId, setSelectedCatId, selectedPrcId, setSelectedPrcId } =
    props;
  const [selectedCat, setSelectedCat] = useState<Category | undefined>();
  const [selectedPrc, setSelectedPrc] = useState<Price | undefined>();
  const [openCat, setOpenCat] = useState(true);
  const [openPrc, setOpenPrc] = useState(true);

  const handleCatListClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: string
  ) => {
    setSelectedCatId(index);
    const foundCat = list.find((cat) => cat.id === index);
    if (foundCat) {
      setSelectedCat(foundCat);
    }
  };
  const handlePrcListClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: string
  ) => {
    setSelectedPrcId(index);
    const foundprc = priceList.find((prc) => prc.id === index);
    if (foundprc) {
      setSelectedPrc(foundprc);
    }
  };

  const handleCatColExpClick = () => {
    setOpenCat(!openCat);
  };
  const handlePrcColExpClick = () => {
    setOpenPrc(!openPrc);
  };

  const handleClearFilter = (e: string) => {
    if (e === "all" || e === "cat") {
      setSelectedCatId(0);
      setSelectedCat(undefined);
    }

    if (e === "all" || e === "prc") {
      setSelectedPrcId(0);
      setSelectedPrc(undefined);
    }
  };

  return (
    <Card>
      <CardContent sx={{ p: 0 }}>
        {(selectedCat || selectedPrc) && (
          <Box
            sx={{
              padding: 1,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {selectedCat && (
              <Typography mr={1} mb={1} className="filter-text">
                {selectedCat.name}{" "}
                <HighlightOffIcon
                  onClick={() => handleClearFilter("cat")}
                  sx={{ ml: 1, cursor: "pointer" }}
                  color="error"
                />
              </Typography>
            )}
            {selectedPrc && (
              <Typography mr={1} mb={1} className="filter-text">
                {`${selectedPrc.min} - ${selectedPrc.max}`}{" "}
                <HighlightOffIcon
                  onClick={() => handleClearFilter("prc")}
                  sx={{ ml: 1, cursor: "pointer" }}
                  color="error"
                />{" "}
              </Typography>
            )}

            {(selectedCat || selectedPrc) && (
              <Typography
                mb={1}
                sx={{ cursor: "pointer" }}
                onClick={() => handleClearFilter("all")}
                className="filter-text"
              >
                Clear All
              </Typography>
            )}
          </Box>
        )}
        {(selectedCat || selectedPrc) && <Divider />}
        <List component="nav">
          <ListItemButton onClick={handleCatColExpClick}>
            <ListItemText
              primary={
                <Typography sx={{ fontWeight: 600 }}>Category</Typography>
              }
            />
            {openCat ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openCat} timeout="auto" unmountOnExit>
            <List component="div" sx={{ maxHeight: 500, overflowY: "auto" }}>
              {list &&
                list.map((category) => (
                  <ListItemButton
                    key={category.id}
                    selected={selectedCatId === category.id}
                    onClick={(event) => handleCatListClick(event, category.id)}
                  >
                    <ListItemText primary={category.name} />
                  </ListItemButton>
                ))}
              {list.length === 0 && (
                <Typography sx={{ textAlign: "center" }}>
                  No category found!
                </Typography>
              )}
            </List>
          </Collapse>
        </List>

        <Divider />

        <List component="nav">
          <ListItemButton onClick={handlePrcColExpClick}>
            <ListItemText
              primary={<Typography sx={{ fontWeight: 600 }}>Price</Typography>}
            />
            {openPrc ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openPrc} timeout="auto" unmountOnExit>
            <List component="div">
              {priceList.map((price) => (
                <ListItemButton
                  key={price.id}
                  selected={selectedPrcId === price.id}
                  onClick={(event) => handlePrcListClick(event, price.id)}
                >
                  <ListItemText primary={`${price.min} - ${price.max}`} />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
        </List>
      </CardContent>
    </Card>
  );
};
export default ProductSideFilter;
