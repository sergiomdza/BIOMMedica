// "use client";
import { useState, useEffect } from 'react';

//Custom Components
import Table from '../../components/TableEdited';
import InventoryModal from '../../components/InventoryModal';

//Material UI
import Typography from '@mui/material/Typography';
import styles from '@/styles/Home.module.css'

export default function Inventario({ machines, totalMachines }) {

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const [localMachines, setLocalMachines] = useState(machines);
    const [localTotalMachines, setLocalTotalMachines] = useState(totalMachines)

    const [selectedData, setSelectedData] = useState(null);

    const getSelectedData = async (selected) => {
        try {
            const res = await fetch(`api/machines/${selected}`);
            const machine = await res.json();
            setSelectedData(machine)

        } catch (e) {
            console.error(e);
            setSelectedData(null)
        }
    };

    const saveData = async (newData) => {
        try {

            console.log('ToUpdate:', newData)
            const res = await fetch(`api/machines/${selected}`, {method: "PUT", body: JSON.stringify(newData)});
            const machine = await res.json();
            console.log('Updated:', machine)

            updateData()

        } catch (e) {
            console.error(e);
        }
    }

    const updateData = async () => {
        const res = await fetch(`api/machines`);
        const machines = await res.json();

        setLocalMachines(machines)

        const totalRes = await fetch(`api/machines`, {method: "PUT"});
        const totalMachines = await totalRes.json();
        setLocalTotalMachines(totalMachines)
    }

    useEffect(() => {
        console.log('Edited:', selected)
        if (selected) {
            getSelectedData(selected);
        };
    }, [selected]);


    const openModal = (editedID) => {
        setOpen(true);
        setSelected(editedID)
    };

    return (
        <div className={styles.mainInventory}>
            <InventoryModal 
                open={open} 
                handleClose={() => setOpen(false)} 
                selectedData={selectedData}
                onSave={(newData) => saveData(newData)}
            />
            <Typography gutterBottom variant="h5" component="div" className={styles.text}>
                INVENTARIO
            </Typography>
            <Table 
                rowHeaders={rowHeaders} 
                rows={localMachines} 
                totalRows={localTotalMachines.count} 
                onEdit={(editedID) => openModal(editedID)}
            />
        </div>
    )
}

const rowHeaders = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Nombre Máquina',
    }
]

export async function getServerSideProps() {
    try {
        const res = await fetch(`${process.env.BACK_HOST}/machines`);
        const machines = await res.json();

        const totalRes = await fetch(`${process.env.BACK_HOST}/machines`, {method: "PUT"});
        const totalMachines = await totalRes.json();

        return {
            props: {
                machines,
                totalMachines
            }
        }
    } catch (e) {
        console.error(e);
        return {
            props: {
                machines: [],
                totalMachines: 0,
            }
        }
    }
}