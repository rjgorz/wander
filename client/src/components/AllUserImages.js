// import React from "react";
import { Grid } from "semantic-ui-react"
import ImageModal from "./ImageModal";

function AllUserImages({ images, setRefresh, setImages }) {
    const imageCards = images.map(image => <ImageModal key={image.id} image={image} setRefresh={setRefresh} setImages={setImages} />)

    return (
        // <div className='imageContainer'>
            <Grid columns={6}>
                {imageCards}
            </Grid>
        // </div>
    )
}

export default AllUserImages;