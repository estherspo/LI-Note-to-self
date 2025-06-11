
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
      // Handle Connections
      const storedConnectionsRaw = localStorage.getItem(CONNECTIONS_STORAGE_KEY);
      let connectionsToSet: Connection[];

      if (storedConnectionsRaw) {
        let parsedConnections = JSON.parse(storedConnectionsRaw) as Connection[];
        // Filter out "Hunter The Cat" by name
        const filteredConnections = parsedConnections.filter(conn => conn.name !== 'Hunter The Cat');
        
        // If filtering changed the list, update localStorage
        if (filteredConnections.length !== parsedConnections.length) {
          localStorage.setItem(CONNECTIONS_STORAGE_KEY, JSON.stringify(filteredConnections));
        }
        connectionsToSet = filteredConnections;
      } else {
        // If no stored connections, use initialConnections (which is now empty)
        connectionsToSet = initialConnections; 
        localStorage.setItem(CONNECTIONS_STORAGE_KEY, JSON.stringify(connectionsToSet)); // Persist initial (empty) state
      }
      setConnections(connectionsToSet);

      // Handle Sent Invitations
      const storedSentInvitationsRaw = localStorage.getItem(SENT_INVITATIONS_STORAGE_KEY);
      let sentInvitationsToSet: string[];

      if (storedSentInvitationsRaw) {
        let parsedSentInvitations = JSON.parse(storedSentInvitationsRaw) as string[];
        // Filter out "Hunter The Cat" (profile ID 'hunter-the-cat') from sent invitations
        const filteredSentInvitations = parsedSentInvitations.filter(id => id !== 'hunter-the-cat');
        
        if (filteredSentInvitations.length !== parsedSentInvitations.length) {
           localStorage.setItem(SENT_INVITATIONS_STORAGE_KEY, JSON.stringify(filteredSentInvitations));
        }
        sentInvitationsToSet = filteredSentInvitations;
      } else {
        // If no stored sent invitations, initialize as empty
        sentInvitationsToSet = [];
        localStorage.setItem(SENT_INVITATIONS_STORAGE_KEY, JSON.stringify(sentInvitationsToSet));
      }
      setSentInvitations(sentInvitationsToSet);

    } catch (error) {
      console.error("Failed to load or reset data from localStorage", error);
      // Fallback to a truly empty state if any error occurs during this process
      const emptyConnections: Connection[] = [];
      const emptySentInvitations: string[] = [];
      setConnections(emptyConnections);
      localStorage.setItem(CONNECTIONS_STORAGE_KEY, JSON.stringify(emptyConnections));
      setSentInvitations(emptySentInvitations);
      localStorage.setItem(SENT_INVITATIONS_STORAGE_KEY, JSON.stringify(emptySentInvitations));
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
      // Determine the original profile ID to remove from sentInvitations
      // Assuming connection ID format `conn-${profile.id}-timestamp`
      // We need to find the profileId from mockProfiles based on something like 'name' if the original 'profile.id' isn't easily extractable
      // Or, more simply, if connectionToRemove.name is unique enough:
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
