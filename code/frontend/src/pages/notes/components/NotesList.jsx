import React, { useState } from 'react';
import { Paper, Button, Container, TextField, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
// Assumi che questo sia un file di stile che hai creato
import styles from './NotesListStyles.jsx';
import Cookies from 'js-cookie';

function NotesList({ notes, onNoteDeleted, onNoteModified }) { // Aggiungi onNoteDeleted come prop per gestire la cancellazione
    const token = Cookies.get('token');

    const handleDeleteNote = async (id) => {
        try {
            const response = await fetch(`/api/notes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (response.ok) {
                // Invece di aggiornare lo stato qui, invoca il callback prop
                onNoteDeleted(id);
            } else {
                console.error('Failed to delete the note');
            }
        } catch (error) {
            console.error('Failed to delete the note', error);
        }
    };
    console.log(notes.map(note => note.id)); // Aggiungi questo per controllare gli ID

    return (
        <List sx={styles.list}>
            {notes.map(note => (
                <ListItem key={note.id}>
                    <ListItemText primary={note.title} />
                    <div> {/* Wrap the multiple JSX elements inside a single parent element */}
                        <IconButton edge="end" aria-label="add" onClick={() => onNoteModified(note.id)}>
                            <AddIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteNote(note.id)}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                </ListItem>
            ))}
        </List>
    );
}


export default NotesList;