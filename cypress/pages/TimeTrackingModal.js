class TimeTrackingModal {
  constructor() {
    this.backlogList = '[data-testid="board-list:backlog"]';
    this.issueDetailModal = '[data-testid="modal:issue-details"]';
    this.issueList = '[data-testid="list-issue"]';
    this.timeTrackingModal = '[data-testid="modal:tracking"]';
    this.estimateHours = 'input[placeholder="Number"]';
    this.closeDetailModalButton = '[data-testid="icon:close"]';
    this.timeSpent = 'Time spent';
    this.timeRemaining = 'Time remaining';
    this.buttonName = 'button';
  }

  getIssueDetailModal() {
    cy.get(this.backlogList).should('be.visible').find(this.issueList).first();
    cy.get(this.issueDetailModal).click();
  }

  addEstimatedHours(originalEstimateHours, updatedEstimateHours) {
    cy.get(this.estimateHours)
      .clear()
      .type(originalEstimateHours, updatedEstimateHours)
      .wait(3000);
  }

  ensureThatEstimationIsAdded(originalEstimateHours) {
    cy.get(this.estimateHours).should('have.value', originalEstimateHours);
  }

  editEstimationHours(originalEstimateHours, updatedEstimateHours) {
    cy.get(this.estimateHours)
      .should('have.value', originalEstimateHours)
      .clear()
      .type(updatedEstimateHours)
      .wait(4000);
  }

  ensureThatEstimationIsEdited(updatedEstimateHours) {
    cy.get(this.estimateHours).should('have.value', updatedEstimateHours);
  }

  clearEstimateHours() {
    cy.get(this.estimateHours).eq(0).clear().should('have.value', '');
  }

  clearTimeTrackingModal() {
    cy.contains('Time Tracking').next().click();
    cy.get(this.timeTrackingModal)
      .should('be.visible')
      .within(() => {
        cy.contains(this.timeSpent)
          .next('div')
          .find('input')
          .clear()
          .should('have.value', '');
        cy.contains(this.timeRemaining)
          .next('div')
          .find('input')
          .clear()
          .should('have.value', '');
        cy.get(this.buttonName).contains('Done').click();
        cy.get(this.timeTrackingModal).should('not.exist');
      });
  }

  ensureThatEstimationHoursRemoved() {
    cy.get(this.issueDetailModal).within(() => {
      cy.get(this.estimateHours)
        .should('have.value', '')
        .and('have.attr', 'placeholder', 'Number');
    });
  }

  validateTimeTrackerSyncOriginal(originalEstimateHours) {
    cy.contains(`${originalEstimateHours}h estimated`).should('exist');
  }

  validateTtimeTrackerSyncUpdated(updatedEstimateHours) {
    cy.contains(`${updatedEstimateHours}h estimated`).should('exist');
  }

  closeIssueDetailModal() {
    cy.get(this.issueDetailModal).within(() => {
      cy.get(this.closeDetailModalButton).first().click();
    });
    cy.get(this.issueDetailModal).should('not.exist');
    cy.reload();
  }

  getTimeTrackingModal() {
    cy.contains('Time Tracking').next().click();
    cy.get(this.timeTrackingModal).should('be.visible');
  }

  addTimeSpent(timeSpent) {
    cy.contains(this.timeSpent)
      .next('div')
      .find('input')
      .clear()
      .type(timeSpent)
      .should('have.value', timeSpent);
  }

  addTimeRemaining(timeRemaining) {
    cy.contains(this.timeRemaining)
      .next('div')
      .find('input')
      .clear()
      .type(timeRemaining)
      .should('have.value', timeRemaining);
  }

  clickDone() {
    cy.get(this.buttonName).contains('Done').click();
    cy.get(this.timeTrackingModal).should('not.exist');
  }

  ensureNoTimeLoggedNotVisible() {
    cy.contains('No time logged').should('not.exist');
  }

  ensureAddedTimeRemaining(timeSpent, timeRemaining) {
    cy.contains(`${timeSpent}h logged`).should('exist');
    cy.contains(`${timeRemaining}h remaining`).should('exist');
  }

  ensureNoTimeLoggedVisible() {
    cy.contains('No time logged').should('be.visible');
  }
}

export default new TimeTrackingModal();
