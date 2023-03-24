"use client";

import Typography from '@mui/material/Typography';

export default function Errores() {
    return (
        <main style={styles.main}>
            <Typography gutterBottom variant="h5" component="div">
                Errores
            </Typography>
        </main>
    )
}

const styles = {
    main: {
        background: "rgb(80,80,80)",
        background: "linear-gradient(0deg, rgba(80,80,80,1) 0%, rgba(255,255,255,0) 100%)",
    }
}