import { useState, useEffect } from 'react';
import Table from '../../components/admin/Table';
import Badge from '../../components/admin/Badge';
import type { TableColumn } from '../../components/admin/Table';
import type { Contact, ContactStatus, ContactPriority } from '../../types/contact.types';
import { ContactStatusEnum, ContactPriorityEnum } from '../../types/contact.types';
import adminContactService from '../../services/adminContactService';
import './ContactMessagesSection.css';

export default function ContactMessagesSection() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminContactService.getAll(1, 50);
      setContacts(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar mensajes');
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await adminContactService.markAsRead(id);
      setContacts((prev) =>
        prev.map((contact) =>
          contact._id === id ? { ...contact, isRead: true, readAt: new Date().toISOString() } : contact
        )
      );
    } catch {
      alert('Error al marcar como leído');
    }
  };

  const handleStatusChange = async (id: string, newStatus: ContactStatus) => {
    try {
      await adminContactService.updateStatus(id, newStatus);
      setContacts((prev) =>
        prev.map((contact) => (contact._id === id ? { ...contact, status: newStatus } : contact))
      );
    } catch {
      alert('Error al actualizar el estado');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar este mensaje?')) return;

    try {
      await adminContactService.delete(id);
      setContacts((prev) => prev.filter((contact) => contact._id !== id));
      if (selectedContact?._id === id) {
        setSelectedContact(null);
      }
    } catch {
      alert('Error al eliminar el mensaje');
    }
  };

  const getStatusBadgeVariant = (
    status: ContactStatus
  ): 'success' | 'warning' | 'error' | 'info' | 'default' => {
    switch (status) {
      case ContactStatusEnum.RESOLVED:
        return 'success';
      case ContactStatusEnum.IN_PROGRESS:
        return 'info';
      case ContactStatusEnum.PENDING:
        return 'warning';
      case ContactStatusEnum.ARCHIVED:
        return 'default';
      default:
        return 'default';
    }
  };

  const getPriorityBadgeVariant = (
    priority: ContactPriority
  ): 'success' | 'warning' | 'error' | 'info' | 'default' => {
    switch (priority) {
      case ContactPriorityEnum.URGENT:
        return 'error';
      case ContactPriorityEnum.HIGH:
        return 'warning';
      case ContactPriorityEnum.MEDIUM:
        return 'info';
      case ContactPriorityEnum.LOW:
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: ContactStatus): string => {
    const labels: Record<ContactStatus, string> = {
      PENDING: 'Pendiente',
      IN_PROGRESS: 'En Progreso',
      RESOLVED: 'Resuelto',
      ARCHIVED: 'Archivado',
    };
    return labels[status] || status;
  };

  const getPriorityLabel = (priority: ContactPriority): string => {
    const labels: Record<ContactPriority, string> = {
      LOW: 'Baja',
      MEDIUM: 'Media',
      HIGH: 'Alta',
      URGENT: 'Urgente',
    };
    return labels[priority] || priority;
  };

  const columns: TableColumn<Contact>[] = [
    {
      key: 'fullName',
      label: 'Nombre',
      width: '15%',
    },
    {
      key: 'email',
      label: 'Email',
      width: '20%',
    },
    {
      key: 'subject',
      label: 'Asunto',
      width: '25%',
    },
    {
      key: 'priority',
      label: 'Prioridad',
      width: '10%',
      render: (value: unknown) => {
        const priority = value as ContactPriority;
        return <Badge variant={getPriorityBadgeVariant(priority)}>{getPriorityLabel(priority)}</Badge>;
      },
    },
    {
      key: 'status',
      label: 'Estado',
      width: '12%',
      render: (value: unknown) => {
        const status = value as ContactStatus;
        return <Badge variant={getStatusBadgeVariant(status)}>{getStatusLabel(status)}</Badge>;
      },
    },
    {
      key: 'isRead',
      label: 'Leído',
      width: '8%',
      render: (value: unknown) => {
        return value ? '✓' : '✗';
      },
    },
    {
      key: 'createdAt',
      label: 'Fecha',
      width: '10%',
      render: (value: unknown) => {
        return new Date(value as string).toLocaleDateString('es-ES');
      },
    },
  ];

  return (
    <div className="contact-messages-section">
      <div className="section-header">
        <h2>Mensajes de Contacto</h2>
        <button className="btn-refresh" onClick={loadContacts} disabled={loading}>
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{ marginRight: '8px' }}
          >
            <polyline points="23 4 23 10 17 10"></polyline>
            <polyline points="1 20 1 14 7 14"></polyline>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
          </svg>
          Actualizar
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="content-layout">
        <div className="table-container-wrapper">
          <Table
            columns={columns}
            data={contacts}
            loading={loading}
            emptyMessage="No hay mensajes de contacto"
            onRowClick={setSelectedContact}
          />
        </div>

        {selectedContact && (
          <div className="contact-detail">
            <div className="detail-header">
              <h3>Detalles del Mensaje</h3>
              <button className="btn-close" onClick={() => setSelectedContact(null)}>
                ✕
              </button>
            </div>

            <div className="detail-content">
              <div className="detail-field">
                <label>Nombre:</label>
                <span>{selectedContact.fullName}</span>
              </div>

              <div className="detail-field">
                <label>Email:</label>
                <span>{selectedContact.email}</span>
              </div>

              <div className="detail-field">
                <label>Teléfono:</label>
                <span>{selectedContact.phone}</span>
              </div>

              <div className="detail-field">
                <label>Asunto:</label>
                <span>{selectedContact.subject}</span>
              </div>

              <div className="detail-field full-width">
                <label>Mensaje:</label>
                <p className="message-content">{selectedContact.message}</p>
              </div>

              <div className="detail-field">
                <label>Prioridad:</label>
                <Badge variant={getPriorityBadgeVariant(selectedContact.priority)}>
                  {getPriorityLabel(selectedContact.priority)}
                </Badge>
              </div>

              <div className="detail-field">
                <label>Estado:</label>
                <select
                  value={selectedContact.status}
                  onChange={(e) => handleStatusChange(selectedContact._id, e.target.value as ContactStatus)}
                  className="status-select"
                >
                  <option value={ContactStatusEnum.PENDING}>Pendiente</option>
                  <option value={ContactStatusEnum.IN_PROGRESS}>En Progreso</option>
                  <option value={ContactStatusEnum.RESOLVED}>Resuelto</option>
                  <option value={ContactStatusEnum.ARCHIVED}>Archivado</option>
                </select>
              </div>

              <div className="detail-field">
                <label>Fecha de creación:</label>
                <span>{new Date(selectedContact.createdAt).toLocaleString('es-ES')}</span>
              </div>

              {selectedContact.readAt && (
                <div className="detail-field">
                  <label>Leído el:</label>
                  <span>{new Date(selectedContact.readAt).toLocaleString('es-ES')}</span>
                </div>
              )}
            </div>

            <div className="detail-actions">
              {!selectedContact.isRead && (
                <button
                  className="btn-action btn-mark-read"
                  onClick={() => handleMarkAsRead(selectedContact._id)}
                >
                  Marcar como Leído
                </button>
              )}
              <button
                className="btn-action btn-delete"
                onClick={() => handleDelete(selectedContact._id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
