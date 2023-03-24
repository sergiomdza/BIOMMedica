"use client";
import Link from 'next/link';
import { Grid } from "@mui/material";
import styles from '@/styles/Home.module.css' 

//Material UI Imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';

const options = [
  {
    title: "Inventario",
    description: "En este apartado podrás revisar todos los equipos médicos correspondientes a cada área y podrás editar sus datos",
    image: "https://leancomponentes.com/wp-content/webpc-passthru.php?src=https://leancomponentes.com/wp-content/uploads/2022/07/tipos-de-inventarios.jpg&nocache=1",
    url: '/Inventario'
  },
  {
    title: "Solución de Errores",
    description: "Aquí encontrarás los posibles errores y las posibles soluciones para distintos errores que se puedan presentar",
    image: "https://static.vecteezy.com/system/resources/previews/008/517/756/non_2x/engineer-fixing-error-flat-illustrations-concept-vector.jpg",
    url: '/Errores'
  }
]


export default function Home() {
  return (
    <div className={styles.main}>
      <Grid container height="100vh" alignItems="center" justifyContent="center" direction="row">
        {
          options.map(({ title, description, image, url }) => (
            <Link href={url} key={title}>
              <Card sx={{ maxWidth: 345, margin: '10px' }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    image={image}
                    alt="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" className={styles.text}>
                      {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className={styles.text}>
                      {description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          ))
        }
        {/* <Snackbar
          open={true}
          autoHideDuration={6000}
          onClose={() => {}}
          message={isConnected ? "DB Connected" : "DB Not Connected"}
          action={() => {}}
          severity={isConnected ? "success" : "error"}
        /> */}
      </Grid>
    </div>
  )
}
