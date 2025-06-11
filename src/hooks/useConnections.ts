
"use client";

import { useState, useEffect, useCallback } from 'react';
import type { Connection, Profile } from '@/lib/types';
import { initialConnections, mockProfiles, getMockProfileById as staticGetMockProfileById } from '@/data/mockProfiles';

const CONNECTIONS_STORAGE_KEY = 'rememble-connections';
const SENT_INVITATIONS_STORAGE_KEY = 'rememble-sent-invitations';

export function useConnections() {
  const [connections, setConnections] = useState<Connection[]>([]);
  const [sentInvitations, setSentInvitations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedConnections = localStorage.getItem(CONNECTIONS_STORAGE_KEY);
      if (storedConnections) {
        setConnections(JSON.parse(storedConnections));
      } else {
        setConnections(initialConnections);
        // localStorage.setItem(CONNECTIONS_STORAGE_KEY, JSON.stringify(initialConnections)); // Save on first actual change
      }

      const storedSentInvitations = localStorage.getItem(SENT_INVITATIONS_STORAGE_KEY);
      if (storedSentInvitations) {
        setSentInvitations(JSON.parse(storedSentInvitations));
      } else {
        setSentInvitations([]);
      }

    } catch (error) {
      console.error("Failed to load data from localStorage", error);
      setConnections(initialConnections);
      setSentInvitations([]);
    }
    setIsLoading(false);
  }, []);

  const saveAppState = useCallback((updatedConnections: Connection[], updatedSentInvitations: string[]) => {
    setConnections(updatedConnections);
    setSentInvitations(updatedSentInvitations);
    try {
      localStorage.setItem(CONNECTIONS_STORAGE_KEY, JSON.stringify(updatedConnections));
      localStorage.setItem(SENT_INVITATIONS_STORAGE_KEY, JSON.stringify(updatedSentInvitations));
    } catch (error) {
      console.error("Failed to save app state to localStorage", error);
    }
  }, []);


  const addConnection = useCallback((profile: Profile, privateNote?: string, standardMessage?: string) => {
    const newConnection: Connection = {
      ...profile,
      id: `conn-${profile.id}-${Date.now()}`, 
      privateNote,
      standardMessage,
      connectionDate: new Date().toISOString(),
    };
    
    // Ensure profile.id is added to sentInvitations, avoiding duplicates
    const updatedSentInvitations = Array.from(new Set([...sentInvitations, profile.id]));
    const updatedConnections = [...connections, newConnection];
    
    saveAppState(updatedConnections, updatedSentInvitations);
    return newConnection;
  }, [connections, sentInvitations, saveAppState]);

  const updateConnectionNote = useCallback((connectionId: string, note: string) => {
    const updatedConnections = connections.map(conn =>
      conn.id === connectionId ? { ...conn, privateNote: note } : conn
    );
    // Note update does not affect sentInvitations list directly
    saveAppState(updatedConnections, sentInvitations);
  }, [connections, sentInvitations, saveAppState]);

  const deleteConnectionNote = useCallback((connectionId: string) => {
    const updatedConnections = connections.map(conn =>
      conn.id === connectionId ? { ...conn, privateNote: undefined } : conn
    );
    saveAppState(updatedConnections, sentInvitations);
  }, [connections, sentInvitations, saveAppState]);
  
  const deleteConnection = useCallback((connectionId: string) => {
    const connectionToRemove = connections.find(conn => conn.id === connectionId);
    const updatedConnections = connections.filter(conn => conn.id !== connectionId);
    
    let updatedSentInvitations = [...sentInvitations];
    if (connectionToRemove) {
      // Use the base profile ID from the connection object for removing from sentInvitations
      const baseProfileId = connectionToRemove.id.replace(/^conn-|-(\d+)$/g, '');
      updatedSentInvitations = sentInvitations.filter(id => id !== baseProfileId);
    }
    
    saveAppState(updatedConnections, updatedSentInvitations);
  }, [connections, sentInvitations, saveAppState]);

  const getConnectionById = useCallback((id: string): Connection | undefined => {
    return connections.find(conn => conn.id === id);
  }, [connections]);

  const getProfileToInvite = useCallback((profileId: string): Profile | undefined => {
    return staticGetMockProfileById(profileId);
  }, []);

  const isInvitationSent = useCallback((profileIdToCheck: string): boolean => {
    return sentInvitations.includes(profileIdToCheck);
  }, [sentInvitations]);


  return {
    connections,
    isLoading,
    addConnection,
    updateConnectionNote,
    deleteConnectionNote,
    deleteConnection,
    getConnectionById,
    getProfileToInvite,
    isInvitationSent, // Expose this
    mockProfiles, 
  };
}
