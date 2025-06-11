
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
      // Force reset to initial (empty) state and save it
      // initialConnections from mockProfiles is already an empty array: export const initialConnections: Connection[] = [];
      const connectionsToSet: Connection[] = initialConnections; 
      const sentInvitationsToSet: string[] = []; 

      localStorage.setItem(CONNECTIONS_STORAGE_KEY, JSON.stringify(connectionsToSet));
      localStorage.setItem(SENT_INVITATIONS_STORAGE_KEY, JSON.stringify(sentInvitationsToSet));
      
      setConnections(connectionsToSet);
      setSentInvitations(sentInvitationsToSet);

    } catch (error) {
      console.error("Failed to clear and initialize data in localStorage", error);
      // Fallback to ensure internal state is empty even if localStorage write fails
      setConnections([]);
      setSentInvitations([]);
       // Attempt to clear localStorage again in case of partial failure
      try {
        localStorage.setItem(CONNECTIONS_STORAGE_KEY, JSON.stringify([]));
        localStorage.setItem(SENT_INVITATIONS_STORAGE_KEY, JSON.stringify([]));
      } catch (e) {
        console.error("Failed to clear localStorage during fallback", e);
      }
    }
    setIsLoading(false);
  }, []); // Empty dependency array means this runs once on mount


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
    
    const updatedSentInvitations = Array.from(new Set([...sentInvitations, profile.id]));
    const updatedConnections = [...connections, newConnection];
    
    saveAppState(updatedConnections, updatedSentInvitations);
    return newConnection;
  }, [connections, sentInvitations, saveAppState]);

  const updateConnectionNote = useCallback((connectionId: string, note: string) => {
    const updatedConnections = connections.map(conn =>
      conn.id === connectionId ? { ...conn, privateNote: note } : conn
    );
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
      const profileData = mockProfiles.find(p => p.name === connectionToRemove.name);
      if (profileData) {
         updatedSentInvitations = sentInvitations.filter(id => id !== profileData.id);
      }
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
    isInvitationSent,
    mockProfiles, 
  };
}
