// Database interaction functions

// Function to fetch all data from the server
async function fetchAllData() {
  try {
    // Fetch all data types in parallel
    const [heroSlides, activities, members, donations, expenses, experiences, weeklyFees] = await Promise.all([
      fetch('/api/hero-slides').then(res => res.json()),
      fetch('/api/activities').then(res => res.json()),
      fetch('/api/members').then(res => res.json()),
      fetch('/api/donations').then(res => res.json()),
      fetch('/api/expenses').then(res => res.json()),
      fetch('/api/experiences').then(res => res.json()),
      fetch('/api/weekly-fees').then(res => res.json())
    ]);

    // Update appData with fetched data
    appData.heroSlides = heroSlides.length > 0 ? heroSlides : appData.heroSlides;
    appData.activities = activities.length > 0 ? activities : appData.activities;
    appData.members = members.length > 0 ? members : appData.members;
    appData.donations = donations.length > 0 ? donations : appData.donations;
    appData.expenses = expenses.length > 0 ? expenses : appData.expenses;
    appData.experiences = experiences.length > 0 ? experiences : appData.experiences;
    appData.weeklyFees = weeklyFees.length > 0 ? weeklyFees : appData.weeklyFees;

    // Re-render all sections with the new data
    renderHeroSlideshow();
    renderHeroManagement();
    renderHomeEvents();
    renderDashboard();
    renderActivities();
    renderMembers();
    renderDonations();
    renderExpenses();
    renderExperiences();
    renderWeeklyFees();
    renderGallery();
    updateTotalDonations();
    updateTotalExpenses();
    renderRecentActivities();
    
    return true;
  } catch (error) {
    console.error('Error fetching data:', error);
    showMessage('Failed to load data from the server. Using local data instead.', 'error');
    return false;
  }
}

// Function to save a hero slide
async function saveHeroSlide(slide) {
  try {
    const method = slide._id ? 'PUT' : 'POST';
    const url = slide._id ? `/api/hero-slides/${slide._id}` : '/api/hero-slides';
    
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(slide)
    });

    if (!response.ok) {
      throw new Error('Failed to save hero slide');
    }

    const savedSlide = await response.json();
    
    // Update local data
    if (method === 'POST') {
      appData.heroSlides.push(savedSlide);
    } else {
      const index = appData.heroSlides.findIndex(s => s._id === savedSlide._id);
      if (index !== -1) {
        appData.heroSlides[index] = savedSlide;
      }
    }

    renderHeroSlideshow();
    renderHeroManagement();
    return savedSlide;
  } catch (error) {
    console.error('Error saving hero slide:', error);
    showMessage('Failed to save hero slide', 'error');
    throw error;
  }
}

// Function to delete a hero slide
async function deleteHeroSlide(slideId) {
  try {
    const response = await fetch(`/api/hero-slides/${slideId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete hero slide');
    }

    // Update local data
    appData.heroSlides = appData.heroSlides.filter(slide => slide._id !== slideId);
    
    renderHeroSlideshow();
    renderHeroManagement();
    return true;
  } catch (error) {
    console.error('Error deleting hero slide:', error);
    showMessage('Failed to delete hero slide', 'error');
    throw error;
  }
}

// Function to save an activity
async function saveActivity(activity) {
  try {
    const method = activity._id ? 'PUT' : 'POST';
    const url = activity._id ? `/api/activities/${activity._id}` : '/api/activities';
    
    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(activity)
    });

    if (!response.ok) {
      throw new Error('Failed to save activity');
    }

    const savedActivity = await response.json();
    
    // Update local data
    if (method === 'POST') {
      appData.activities.push(savedActivity);
    } else {
      const index = appData.activities.findIndex(a => a._id === savedActivity._id);
      if (index !== -1) {
        appData.activities[index] = savedActivity;
      }
    }

    renderActivities();
    return savedActivity;
  } catch (error) {
    console.error('Error saving activity:', error);
    showMessage('Failed to save activity', 'error');
    throw error;
  }
}

// Function to delete an activity
async function deleteActivity(activityId) {
  try {
    const response = await fetch(`/api/activities/${activityId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete activity');
    }

    // Update local data
    appData.activities = appData.activities.filter(activity => activity._id !== activityId);
    
    renderActivities();
    return true;
  } catch (error) {
    console.error('Error deleting activity:', error);
    showMessage('Failed to delete activity', 'error');
    throw error;
  }
}

// Function to save a member
async function saveMember(member) {
  // Similar implementation as saveHeroSlide and saveActivity
  // This is a placeholder for the actual implementation
  console.log('Save member functionality to be implemented');
  return member;
}

// Function to delete a member
async function deleteMember(memberId) {
  // Similar implementation as deleteHeroSlide and deleteActivity
  // This is a placeholder for the actual implementation
  console.log('Delete member functionality to be implemented');
  return true;
}

// Function to save a donation
async function saveDonation(donation) {
  // Similar implementation as other save functions
  // This is a placeholder for the actual implementation
  console.log('Save donation functionality to be implemented');
  return donation;
}

// Function to save an expense
async function saveExpense(expense) {
  // Similar implementation as other save functions
  // This is a placeholder for the actual implementation
  console.log('Save expense functionality to be implemented');
  return expense;
}

// Function to save an experience
async function saveExperience(experience) {
  // Similar implementation as other save functions
  // This is a placeholder for the actual implementation
  console.log('Save experience functionality to be implemented');
  return experience;
}

// Function to save a weekly fee
async function saveWeeklyFee(fee) {
  // Similar implementation as other save functions
  // This is a placeholder for the actual implementation
  console.log('Save weekly fee functionality to be implemented');
  return fee;
}

// Function to initialize the database with default data if empty
async function initializeDatabase() {
  try {
    // Check if there's any data in the database
    const heroSlides = await fetch('/api/hero-slides').then(res => res.json());
    
    // If no hero slides exist, populate the database with default data
    if (heroSlides.length === 0) {
      console.log('Initializing database with default data...');
      
      // Add hero slides
      for (const slide of appData.heroSlides) {
        await fetch('/api/hero-slides', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(slide)
        });
      }
      
      // Add activities
      for (const activity of appData.activities) {
        await fetch('/api/activities', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(activity)
        });
      }
      
      // Add members
      for (const member of appData.members) {
        await fetch('/api/members', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(member)
        });
      }
      
      // Add donations
      for (const donation of appData.donations) {
        await fetch('/api/donations', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(donation)
        });
      }
      
      // Add expenses
      for (const expense of appData.expenses) {
        await fetch('/api/expenses', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(expense)
        });
      }
      
      // Add experiences
      for (const experience of appData.experiences) {
        await fetch('/api/experiences', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(experience)
        });
      }
      
      // Add weekly fees
      for (const fee of appData.weeklyFees) {
        await fetch('/api/weekly-fees', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(fee)
        });
      }
      
      console.log('Database initialized with default data');
      showMessage('Database initialized with default data', 'success');
    }
    
    return true;
  } catch (error) {
    console.error('Error initializing database:', error);
    showMessage('Failed to initialize database', 'error');
    return false;
  }
}

// Function to render all sections after data is loaded
function renderAllSections() {
  renderHeroSlideshow();
  renderHeroManagement();
  renderHomeEvents();
  renderDashboard();
  renderActivities();
  renderMembers();
  renderDonations();
  renderExpenses();
  renderExperiences();
  renderWeeklyFees();
  renderGallery();
  updateTotalDonations();
  updateTotalExpenses();
  renderRecentActivities();
}