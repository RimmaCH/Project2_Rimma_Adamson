import TimeTrackingModal from '../pages/TimeTrackingModal';

describe('Issue time tracking function', () => {
  const originalEstimateHours = '10';
  const updatedEstimateHours = '20';
  const timeSpent = '2';
  const timeRemaining = '5';
  beforeEach(() => {
    cy.visit('/');
    cy.url()
      .should('eq', `${Cypress.env('baseUrl')}project/board`)
      .then((url) => {
        cy.visit(url + '/board');
        cy.contains('This is an issue of type: Task.').click();
      });
  });

  it('Should test time estimation functionality: clear-add-edit', () => {
    // Preapare fields, clearing field value
    TimeTrackingModal.getIssueDetailModal();
    TimeTrackingModal.clearEstimateHours();
    TimeTrackingModal.clearTimeTrackingModal();
    TimeTrackingModal.ensureThatEstimationHoursRemoved();

    // Adding new estimation
    TimeTrackingModal.addEstimatedHours(originalEstimateHours);
    TimeTrackingModal.closeIssueDetailModal();
    TimeTrackingModal.getIssueDetailModal();
    TimeTrackingModal.ensureThatEstimationIsAdded(originalEstimateHours);
    TimeTrackingModal.validateTimeTrackerSyncOriginal(originalEstimateHours);

    // Editing original estimation
    TimeTrackingModal.editEstimationHours(
      originalEstimateHours,
      updatedEstimateHours
    );
    TimeTrackingModal.closeIssueDetailModal();
    TimeTrackingModal.getIssueDetailModal();
    TimeTrackingModal.ensureThatEstimationIsEdited(updatedEstimateHours);
    TimeTrackingModal.validateTtimeTrackerSyncUpdated(updatedEstimateHours);
  });

  it('Should test time logging functionality', () => {
    // Return original estimated time
    TimeTrackingModal.addEstimatedHours(originalEstimateHours);

    // Log time
    TimeTrackingModal.getTimeTrackingModal();
    TimeTrackingModal.addTimeSpent(timeSpent);
    TimeTrackingModal.addTimeRemaining(timeRemaining);
    TimeTrackingModal.clickDone();
    TimeTrackingModal.ensureNoTimeLoggedNotVisible();
    TimeTrackingModal.ensureAddedTimeRemaining(timeSpent, timeRemaining);

    // Remove logged lime
    TimeTrackingModal.clearTimeTrackingModal();
    TimeTrackingModal.ensureNoTimeLoggedVisible();
    TimeTrackingModal.validateTimeTrackerSyncOriginal(originalEstimateHours);
  });
});
