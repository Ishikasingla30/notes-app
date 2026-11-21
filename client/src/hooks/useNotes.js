import { useCallback, useEffect, useReducer } from "react";
import api from "../api/axios";

const initialState = { notes: [], loading: true, error: "" };

// The reducer decides how the state changes for each action
function reducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return { notes: action.payload, loading: false, error: "" };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "ADD":
      return { ...state, notes: [action.payload, ...state.notes] };
    case "UPDATE":
      return {
        ...state,
        notes: state.notes
          .map((n) => (n._id === action.payload._id ? action.payload : n))
          // keep pinned notes on top (sort is stable)
          .sort((a, b) => Number(b.isPinned) - Number(a.isPinned)),
      };
    case "REMOVE":
      return {
        ...state,
        notes: state.notes.filter((n) => n._id !== action.payload),
      };
    default:
      return state;
  }
}

export default function useNotes({ search = "", tag = "", archived = false } = {}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchNotes = useCallback(async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const params = { archived };
      if (search) params.search = search;
      if (tag) params.tag = tag;
      const res = await api.get("/notes", { params });
      dispatch({ type: "FETCH_SUCCESS", payload: res.data.notes });
    } catch (err) {
      dispatch({
        type: "FETCH_ERROR",
        payload: err.response?.data?.message || "Could not load notes",
      });
    }
  }, [search, tag, archived]);

  // Fetch again whenever search, tag or archived changes
  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const addNote = async (data) => {
    const res = await api.post("/notes", data);
    dispatch({ type: "ADD", payload: res.data.note });
    return res.data.note;
  };

  const updateNote = async (id, data) => {
    const res = await api.put(`/notes/${id}`, data);
    dispatch({ type: "UPDATE", payload: res.data.note });
  };

  const deleteNote = async (id) => {
    await api.delete(`/notes/${id}`); // moves the note to trash
    dispatch({ type: "REMOVE", payload: id });
  };

  const togglePin = async (id) => {
    const res = await api.patch(`/notes/${id}/pin`);
    dispatch({ type: "UPDATE", payload: res.data.note });
  };

  const toggleArchive = async (id) => {
    await api.patch(`/notes/${id}/archive`);
    dispatch({ type: "REMOVE", payload: id }); // it leaves this list
  };

  return {
    ...state,
    addNote,
    updateNote,
    deleteNote,
    togglePin,
    toggleArchive,
    refetch: fetchNotes,
  };
}