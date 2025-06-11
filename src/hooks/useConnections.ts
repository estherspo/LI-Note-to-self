"use client";

import { useState, useEffect, useCallback } from 'react';
import type { Connection, Profile } from '@/lib/types';
import { initialConnections, mockProfiles, getMockProfileById as staticGetMockProfileById } from '@/data/mockProfiles';

const LOCAL_STORAGE_KEY = 'rememble-connections';

export function useConnections() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedConnections = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedConnections) {
        setConnections(JSON.parse(storedConnections));
      } else {
        // Initialize with some mock data if no connections are stored
        setConnections(initialConnections);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialConnections));
      }
    } catch (error) {
      console.error("Failed to load connections from localStorage", error);
      // Fallback to initial mock data in case of error (e.g. parsing error)
      setConnections(initialConnections);
    }
    setIsLoading(false);
  }, []);

  const saveConnections = useCallback((updatedConnections: Connection[]) => {
    setConnections(updatedConnections);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedConnections));
    } catch (error) {
      console.error("Failed to save connections to localStorage", error);
    }
  }, []);

  const addConnection = useCallback((profile: Profile, privateNote?: string, standardMessage?: string) => {
    const newConnection: Connection = {
      ...profile,
      id: `conn-${profile.id}-${Date.now()}`, // Ensure unique ID for connection
      privateNote,
      standardMessage,
      connectionDate: new Date().toISOString(),
    };
    // Avoid adding if a connection with the same base profile.id already exists
    // This simple check might need refinement based on exact requirements
    if (connections.some(c => c.id.startsWith(`conn-${profile.id}`))) {
        // Or update existing instead of skipping? For now, skip to avoid duplicates on refresh
        console.warn(`Connection for profile ${profile.id} might already exist. Skipping add.`);
        // To update:
        // const existingIndex = connections.findIndex(c => c.id.startsWith(`conn-${profile.id}`));
        // const updated = [...connections];
        // updated[existingIndex] = { ...updated[existingIndex], privateNote, standardMessage, connectionDate: new Date().toISOString() };
        // saveConnections(updated);
        return;
    }
    saveConnections([...connections, newConnection]);
    return newConnection;
  }, [connections, saveConnections]);

  const updateConnectionNote = useCallback((connectionId: string, note: string) => {
    const updatedConnections = connections.map(conn =>
      conn.id === connectionId ? { ...conn, privateNote: note } : conn
    );
    saveConnections(updatedConnections);
  }, [connections, saveConnections]);

  const deleteConnectionNote = useCallback((connectionId: string) => {
    const updatedConnections = connections.map(conn =>
      conn.id === connectionId ? { ...conn, privateNote: undefined } : conn
    );
    saveConnections(updatedConnections);
  }, [connections, saveConnections]);
  
  const deleteConnection = useCallback((connectionId: string) => {
    const updatedConnections = connections.filter(conn => conn.id !== connectionId);
    saveConnections(updatedConnections);
  }, [connections, saveConnections]);

  const getConnectionById = useCallback((id: string): Connection | undefined => {
    return connections.find(conn => conn.id === id);
  }, [connections]);

  const getProfileToInvite = useCallback((profileId: string): Profile | undefined => {
    // Check if this profile is already a connection
    const existingConnection = connections.find(c => c.id.includes(profileId)); // simplified check
    if (existingConnection) {
      // Potentially return the connection object or a flag indicating they are already connected
      // For now, let's still return the base profile to allow interaction (e.g. update note)
      // Or, ideally, the UI should prevent inviting an existing connection.
      // For this mock, we'll fetch from static profiles.
    }
    return staticGetMockProfileById(profileId);
  }, [connections]);


  return {
    connections,
    isLoading,
    addConnection,
    updateConnectionNote,
    deleteConnectionNote,
    deleteConnection,
    getConnectionById,
    getProfileToInvite,
    mockProfiles, // Expose all mock profiles for listing/inviting
  };
}
