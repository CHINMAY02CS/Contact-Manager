import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import type { AppDispatch, RootState } from "../redux/store";
import Modal from "./shared/Modal";
import ContactForm from "./ContactForm";
import ConfirmationModal from "./ConfirmationModal";

import { useDispatch } from "react-redux";
import type { Contact } from "../redux/types";
import {
  addContact,
  bulkDeleteContacts,
  deleteContact,
  editContact,
} from "../redux/contactSlice";
import type { ContactFormData } from "../utils/validation";
import { DeleteIcon, EditIcon, SearchIcon } from "./Icons";

export default function ContactsTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const allContacts = useSelector((state: RootState) => state.contact.contacts);

  const dispatch: AppDispatch = useDispatch();

  const [editingContact, setEditingContact] = useState<Contact | undefined>(
    undefined
  );

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteMode, setDeleteMode] = useState<"single" | "bulk" | null>(null);
  const [singleDeleteId, setSingleDeleteId] = useState<string | null>(null);

  const contacts = useMemo(() => {
    if (!searchTerm.trim()) return allContacts; // ignore empty search
    const term = searchTerm.toLowerCase();
    return allContacts.filter(
      (contact) =>
        contact.fullName.toLowerCase().includes(term) ||
        contact.email.toLowerCase().includes(term)
    );
  }, [allContacts, searchTerm]);

  // --- Bulk Selection Handlers (Requirement 5: Bulk Delete) ---
  const handleToggleAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(contacts.map((c) => c.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDeleteClick = (id: string) => {
    setDeleteMode("single");
    setSingleDeleteId(id);
    setIsConfirmationModalOpen(true);
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setIsEditModalOpen(true);
  };

  const handleBulkDeleteClick = () => {
    if (selectedIds.length > 0) {
      setDeleteMode("bulk");
      setIsConfirmationModalOpen(true);
    }
  };

  const handleAddSubmit = (data: ContactFormData) => {
    dispatch(addContact(data));
  };

  const handleEditSubmit = (data: ContactFormData) => {
    if (editingContact) {
      const updatedContact: Contact = { ...editingContact, ...data };
      dispatch(editContact(updatedContact));
      setEditingContact(undefined);
    }
  };

  const handleConfirmDeletion = () => {
    if (deleteMode === "single" && singleDeleteId) {
      dispatch(deleteContact(singleDeleteId));
      setSingleDeleteId(null);
    } else if (deleteMode === "bulk" && selectedIds.length > 0) {
      dispatch(bulkDeleteContacts(selectedIds));
      setSelectedIds([]); // Clear selection after deletion
    }
    setDeleteMode(null);
  };

  const bulkDeleteCount = selectedIds.length;

  const isAllSelected =
    selectedIds.length > 0 && selectedIds.length === contacts.length;

  return (
    <>
      <div className="action-bar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by Name or Contact, Email, State..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-search"
          />
          <SearchIcon />
        </div>
        <div className="action-buttons">
          {bulkDeleteCount > 0 && (
            <button
              className="btn btn-primary mr-10"
              onClick={handleBulkDeleteClick}
            >
              Bulk Delete ({bulkDeleteCount})
            </button>
          )}
          <button
            className="btn btn-primary"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Contact
          </button>
        </div>
      </div>

      <div className="contact-table-wrapper">
        <table className="contact-table">
          <thead>
            <tr>
              <th className="checkbox-col">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleToggleAll}
                />
              </th>
              <th>Name</th>
              <th>Contact</th>
              <th>Email</th>
              <th>Address</th>
              <th className="action-col">Action</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <tr key={contact.id}>
                <td className="checkbox-col">
                  <input
                    type="checkbox"
                    id={contact.id}
                    checked={selectedIds.includes(contact.id)}
                    onChange={() => handleToggleOne(contact.id)}
                  />
                </td>
                <td className="name-col">{contact.fullName}</td>
                <td>{contact.phone}</td>
                <td>{contact.email}</td>
                <td>
                  {contact.addressLine1}
                  {contact.addressLine2 && `, ${contact.addressLine2}`}
                  {contact.state && `, ${contact.state}`}
                  {contact.pincode && ` - ${contact.pincode}`}
                </td>
                <td className="action-col">
                  <div className="action-value-col">
                    <button
                      onClick={() => handleEdit(contact)}
                      className="action-btn"
                    >
                      <EditIcon /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(contact.id)}
                      className="action-btn"
                    >
                      <DeleteIcon /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {contacts.length === 0 && (
              <tr>
                <td colSpan={6} className="no-data">
                  No contacts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Add Contact Modal (Requirement 2) */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Contact"
        width="600px"
      >
        <ContactForm
          onSubmit={handleAddSubmit}
          onClose={() => setIsAddModalOpen(false)}
        />
      </Modal>

      {/* Edit Contact Modal (Optional Enhancement) */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Contact"
        width="600px"
      >
        {editingContact && (
          <ContactForm
            onSubmit={handleEditSubmit}
            onClose={() => setIsEditModalOpen(false)}
            defaultValues={editingContact}
          />
        )}
      </Modal>

      {/* Confirmation Modal (Requirement 3 & 5) */}
      <ConfirmationModal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={handleConfirmDeletion}
        titleCount={deleteMode === "bulk" ? bulkDeleteCount : 0}
        message={
          deleteMode === "single"
            ? "Are you sure you want to delete this contact?"
            : `Are you sure you want to delete all ${bulkDeleteCount} contacts?`
        }
        confirmText={
          deleteMode === "single" ? "Delete" : `Delete All ${bulkDeleteCount}`
        }
      />
    </>
  );
}
