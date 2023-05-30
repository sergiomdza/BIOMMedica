import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Modal from './Modal';
import { TextField } from '@mui/material';
import styles from '@/styles/Home.module.css'

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function InventoryModal({ openVar: { open, save }, handleClose, selectedData, onEdit, onAdd, reports }) {

    const [localData, setlocalData] = useState(selectedData)
    const [localreports, setLocalreports] = useState(reports || []);

    const onChange = (field, value) => {
        setlocalData((localData) => ({ ...localData, [field]: value }))
    }

    useEffect(() => {
        setlocalData(selectedData);

        const reportsFiltered = reports.filter(({ machine }) => machine?._id == selectedData?._id)
        console.log("Reports", reportsFiltered)
        setLocalreports(reportsFiltered);
    }, [selectedData])

    const onSaveChanges = () => {
        if (save) {
            onAdd(localData)
        } else {
            onEdit(localData)
        }
    }


    return (
        <Modal open={open} handleClose={handleClose} onSave={() => onSaveChanges()}>
            <Typography id="modal-modal-title" variant="h6" component="h2" className={styles.input}>
                ID: {localData?._id || "No ID"}
            </Typography>
            <TextField
                className={styles.input}
                id="outlined-basic"
                label="Nombre del Equipo"
                variant="outlined"
                onChange={(event) => onChange('name', event.target.value)}
                value={localData?.name || " "}
            />
            <TextField
                className={styles.input}
                id="outlined-basic"
                label="Localización"
                variant="outlined"
                onChange={(event) => onChange('location', event.target.value)}
                value={localData?.location || " "}
            />
            <TextField
                className={styles.input}
                id="outlined-basic"
                label="Número de Serie"
                variant="outlined"
                onChange={(event) => onChange('serial_number', event.target.value)}
                value={localData?.serial_number || " "}
            />
            <TextField
                className={styles.input}
                id="outlined-basic"
                label="Numero de Inventario"
                variant="outlined"
                onChange={(event) => onChange('inv_number', event.target.value)}
                value={localData?.inv_number || " "}
            />
            <TextField
                className={styles.input}
                id="outlined-basic"
                label="Marca"
                variant="outlined"
                onChange={(event) => onChange('brand', event.target.value)}
                value={localData?.brand || " "}
            />
            <TextField
                className={styles.input}
                id="outlined-basic"
                label="Modelo"
                variant="outlined"
                onChange={(event) => onChange('model', event.target.value)}
                value={localData?.model || " "}
            />
            <TextField
                className={styles.input}
                id="outlined-basic"
                label="Frecuencia de Mantenimientos"
                variant="outlined"
                onChange={(event) => onChange('freq_mant', event.target.value)}
                value={localData?.freq_mant || " "}
            />
            {
                localreports.map(({ name, zone, startDate, endDate }) => (
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Zona: {zone}
                            </Typography>
                            <Typography>
                                Fecha Inicio: {startDate}
                            </Typography>
                            <Typography>
                                Fecha Fin: {endDate}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                ))
            }
        </Modal>
    );
}