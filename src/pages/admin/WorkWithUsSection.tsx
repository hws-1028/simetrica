import { useState, useEffect } from 'react';
import Table from '../../components/admin/Table';
import Badge from '../../components/admin/Badge';
import type { TableColumn } from '../../components/admin/Table';
import type { WorkWithUs, ApplicationStatus, Experience, Availability, Specialty } from '../../types/work-with-us.types';
import { ApplicationStatusEnum } from '../../types/work-with-us.types';
import adminWorkWithUsService from '../../services/adminWorkWithUsService';
import './WorkWithUsSection.css';

export default function WorkWithUsSection() {
  const [applications, setApplications] = useState<WorkWithUs[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<WorkWithUs | null>(null);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminWorkWithUsService.getAll(1, 50);
      setApplications(response.data);
    } catch {
      setError('Error al cargar aplicaciones');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: ApplicationStatus) => {
    try {
      await adminWorkWithUsService.updateStatus(id, newStatus);
      setApplications((prev) =>
        prev.map((app) => (app._id === id ? { ...app, status: newStatus } : app))
      );
    } catch {
      alert('Error al actualizar el estado');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de eliminar esta aplicación?')) return;

    try {
      await adminWorkWithUsService.delete(id);
      setApplications((prev) => prev.filter((app) => app._id !== id));
      if (selectedApplication?._id === id) {
        setSelectedApplication(null);
      }
    } catch {
      alert('Error al eliminar la aplicación');
    }
  };

  const getStatusBadgeVariant = (
    status: ApplicationStatus
  ): 'success' | 'warning' | 'error' | 'info' | 'default' => {
    switch (status) {
      case ApplicationStatusEnum.APPROVED:
        return 'success';
      case ApplicationStatusEnum.REVIEWING:
      case ApplicationStatusEnum.CONTACTED:
        return 'info';
      case ApplicationStatusEnum.PENDING:
        return 'warning';
      case ApplicationStatusEnum.REJECTED:
        return 'error';
      case ApplicationStatusEnum.ARCHIVED:
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: ApplicationStatus): string => {
    const labels: Record<ApplicationStatus, string> = {
      PENDING: 'Pendiente',
      REVIEWING: 'Revisando',
      APPROVED: 'Aprobado',
      REJECTED: 'Rechazado',
      CONTACTED: 'Contactado',
      ARCHIVED: 'Archivado',
    };
    return labels[status] || status;
  };

  const getExperienceLabel = (experience: Experience): string => {
    const labels: Record<Experience, string> = {
      LESS_THAN_ONE: '< 1 año',
      ONE_TO_THREE: '1-3 años',
      THREE_TO_FIVE: '3-5 años',
      FIVE_TO_TEN: '5-10 años',
      MORE_THAN_TEN: '> 10 años',
    };
    return labels[experience] || experience;
  };

  const getAvailabilityLabel = (availability: Availability): string => {
    const labels: Record<Availability, string> = {
      FULL_TIME: 'Tiempo Completo',
      PART_TIME: 'Medio Tiempo',
      WEEKENDS: 'Fines de Semana',
      CONTRACT: 'Contrato',
    };
    return labels[availability] || availability;
  };

  const getSpecialtyLabel = (specialty: Specialty): string => {
    const labels: Record<Specialty, string> = {
      OBRA_NEGRA: 'Obra Negra',
      OBRA_BLANCA: 'Obra Blanca',
      CARPINTERIA: 'Carpintería',
      ELECTRICIDAD: 'Electricidad',
      PLOMERIA: 'Plomería',
      ESTRUCTURAS_METALICAS: 'Estructuras Metálicas',
      OTRO: 'Otro',
    };
    return labels[specialty] || specialty;
  };

  const columns: TableColumn<WorkWithUs>[] = [
    {
      key: 'fullName',
      label: 'Nombre',
      width: '20%',
    },
    {
      key: 'email',
      label: 'Email',
      width: '20%',
    },
    {
      key: 'experienceLevel',
      label: 'Experiencia',
      width: '15%',
      render: (value: unknown) => getExperienceLabel(value as Experience),
    },
    {
      key: 'availability',
      label: 'Disponibilidad',
      width: '15%',
      render: (value: unknown) => getAvailabilityLabel(value as Availability),
    },
    {
      key: 'applicationScore',
      label: 'Puntuación',
      width: '10%',
      render: (value: unknown) => {
        const score = value as number;
        return score ? `${score}/100` : 'N/A';
      },
    },
    {
      key: 'status',
      label: 'Estado',
      width: '12%',
      render: (value: unknown) => {
        const status = value as ApplicationStatus;
        return <Badge variant={getStatusBadgeVariant(status)}>{getStatusLabel(status)}</Badge>;
      },
    },
    {
      key: 'createdAt',
      label: 'Fecha',
      width: '8%',
      render: (value: unknown) => new Date(value as string).toLocaleDateString('es-ES'),
    },
  ];

  return (
    <div className="work-with-us-section">
      <div className="section-header">
        <h2>Aplicaciones de Empleo</h2>
        <button className="btn-refresh" onClick={loadApplications} disabled={loading}>
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
            data={applications}
            loading={loading}
            emptyMessage="No hay aplicaciones de empleo"
            onRowClick={setSelectedApplication}
          />
        </div>

        {selectedApplication && (
          <div className="application-detail">
            <div className="detail-header">
              <h3>Detalles de Aplicación</h3>
              <button className="btn-close" onClick={() => setSelectedApplication(null)}>
                ✕
              </button>
            </div>

            <div className="detail-content">
              <div className="detail-section">
                <h4>Información Personal</h4>
                <div className="detail-grid">
                  <div className="detail-field">
                    <label>Nombre Completo:</label>
                    <span>{selectedApplication.fullName}</span>
                  </div>
                  <div className="detail-field">
                    <label>Cédula:</label>
                    <span>{selectedApplication.identificationNumber}</span>
                  </div>
                  <div className="detail-field">
                    <label>Email:</label>
                    <span>{selectedApplication.email}</span>
                  </div>
                  <div className="detail-field">
                    <label>Teléfono:</label>
                    <span>{selectedApplication.contactNumber}</span>
                  </div>
                  <div className="detail-field">
                    <label>Fecha de Nacimiento:</label>
                    <span>{new Date(selectedApplication.birthDate).toLocaleDateString('es-ES')}</span>
                  </div>
                  <div className="detail-field">
                    <label>Ubicación:</label>
                    <span>{selectedApplication.municipality}, {selectedApplication.department}</span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>Información Profesional</h4>
                <div className="detail-grid">
                  <div className="detail-field full-width">
                    <label>Especialidades:</label>
                    <div className="specialty-badges">
                      {selectedApplication.specialties.map((specialty) => (
                        <Badge key={specialty} variant="info" size="sm">
                          {getSpecialtyLabel(specialty)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {selectedApplication.otherSpecialtyDetail && (
                    <div className="detail-field full-width">
                      <label>Otra Especialidad:</label>
                      <span>{selectedApplication.otherSpecialtyDetail}</span>
                    </div>
                  )}
                  <div className="detail-field">
                    <label>Experiencia:</label>
                    <span>{getExperienceLabel(selectedApplication.experienceLevel)}</span>
                  </div>
                  <div className="detail-field">
                    <label>Certificaciones:</label>
                    <span>{selectedApplication.hasCertifications ? 'Sí' : 'No'}</span>
                  </div>
                  <div className="detail-field">
                    <label>Disponibilidad:</label>
                    <span>{getAvailabilityLabel(selectedApplication.availability)}</span>
                  </div>
                  <div className="detail-field">
                    <label>Proyectos Completados:</label>
                    <span>{selectedApplication.completedProjectsRange}</span>
                  </div>
                  {selectedApplication.constructionExperienceDescription && (
                    <div className="detail-field full-width">
                      <label>Descripción de Experiencia:</label>
                      <p className="description-content">
                        {selectedApplication.constructionExperienceDescription}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="detail-section">
                <h4>Referencias</h4>
                <div className="references-list">
                  {selectedApplication.references.map((ref, index) => (
                    <div key={index} className="reference-card">
                      <strong>{ref.name}</strong>
                      <span>{ref.phone}</span>
                      {ref.relationship && <em>{ref.relationship}</em>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h4>Estado de Aplicación</h4>
                <div className="detail-grid">
                  <div className="detail-field">
                    <label>Puntuación:</label>
                    <span className="score">
                      {selectedApplication.applicationScore || 'N/A'}/100
                    </span>
                  </div>
                  <div className="detail-field">
                    <label>Estado:</label>
                    <select
                      value={selectedApplication.status}
                      onChange={(e) =>
                        handleStatusChange(selectedApplication._id, e.target.value as ApplicationStatus)
                      }
                      className="status-select"
                    >
                      <option value={ApplicationStatusEnum.PENDING}>Pendiente</option>
                      <option value={ApplicationStatusEnum.REVIEWING}>Revisando</option>
                      <option value={ApplicationStatusEnum.APPROVED}>Aprobado</option>
                      <option value={ApplicationStatusEnum.REJECTED}>Rechazado</option>
                      <option value={ApplicationStatusEnum.CONTACTED}>Contactado</option>
                      <option value={ApplicationStatusEnum.ARCHIVED}>Archivado</option>
                    </select>
                  </div>
                  <div className="detail-field">
                    <label>Fecha de Aplicación:</label>
                    <span>{new Date(selectedApplication.createdAt).toLocaleString('es-ES')}</span>
                  </div>
                  {selectedApplication.reviewedAt && (
                    <div className="detail-field">
                      <label>Fecha de Revisión:</label>
                      <span>{new Date(selectedApplication.reviewedAt).toLocaleString('es-ES')}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="detail-actions">
              <button className="btn-action btn-delete" onClick={() => handleDelete(selectedApplication._id)}>
                Eliminar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
