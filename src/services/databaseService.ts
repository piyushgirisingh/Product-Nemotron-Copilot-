import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Phase, Task, LifecycleData, ReportData } from '../App';
import { TeamMember } from '../types/collaboration';

export interface Project {
  id: string;
  userId: string;
  name: string;
  description: string;
  targetUsers: string;
  timeline: string;
  phases: Phase[];
  tasks: Task[];
  risks: string[];
  kpis: string[];
  teamMembers: TeamMember[];
  taskAssignments: Record<string, string[]>;
  reportData: ReportData | null;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Create a new project
 */
export const createProject = async (
  userId: string,
  projectData: Omit<Project, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
): Promise<string> => {
  try {
    const projectRef = doc(collection(db, 'projects'));
    const projectId = projectRef.id;

    const newProject: Omit<Project, 'id'> = {
      ...projectData,
      userId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await setDoc(projectRef, {
      ...newProject,
      createdAt: Timestamp.fromDate(newProject.createdAt),
      updatedAt: Timestamp.fromDate(newProject.updatedAt),
    });

    return projectId;
  } catch (error: any) {
    console.error('Error creating project:', error);
    throw new Error(error.message || 'Failed to create project');
  }
};

/**
 * Get a specific project by ID
 */
export const getProject = async (projectId: string): Promise<Project | null> => {
  try {
    const docRef = doc(db, 'projects', projectId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      } as Project;
    }
    return null;
  } catch (error: any) {
    console.error('Error getting project:', error);
    throw new Error(error.message || 'Failed to get project');
  }
};

/**
 * Get all projects for a user
 */
export const getUserProjects = async (userId: string): Promise<Project[]> => {
  try {
    const projectsRef = collection(db, 'projects');
    const q = query(
      projectsRef,
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);

    const projects: Project[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      projects.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate(),
      } as Project);
    });

    return projects;
  } catch (error: any) {
    console.error('Error getting user projects:', error);
    throw new Error(error.message || 'Failed to get user projects');
  }
};

/**
 * Update an existing project
 */
export const updateProject = async (
  projectId: string,
  updates: Partial<Omit<Project, 'id' | 'userId' | 'createdAt' | 'updatedAt'>>
): Promise<void> => {
  try {
    const projectRef = doc(db, 'projects', projectId);
    await updateDoc(projectRef, {
      ...updates,
      updatedAt: Timestamp.fromDate(new Date()),
    });
  } catch (error: any) {
    console.error('Error updating project:', error);
    throw new Error(error.message || 'Failed to update project');
  }
};

/**
 * Delete a project
 */
export const deleteProject = async (projectId: string): Promise<void> => {
  try {
    const projectRef = doc(db, 'projects', projectId);
    await deleteDoc(projectRef);
  } catch (error: any) {
    console.error('Error deleting project:', error);
    throw new Error(error.message || 'Failed to delete project');
  }
};

/**
 * Update task status
 */
export const updateTaskStatus = async (
  projectId: string,
  taskId: string,
  status: Task['status']
): Promise<void> => {
  try {
    const project = await getProject(projectId);
    if (!project) throw new Error('Project not found');

    const updatedTasks = project.tasks.map((task) =>
      task.id === taskId ? { ...task, status } : task
    );

    await updateProject(projectId, { tasks: updatedTasks });
  } catch (error: any) {
    console.error('Error updating task status:', error);
    throw new Error(error.message || 'Failed to update task status');
  }
};

/**
 * Add team member to project
 */
export const addTeamMember = async (
  projectId: string,
  member: TeamMember
): Promise<void> => {
  try {
    const project = await getProject(projectId);
    if (!project) throw new Error('Project not found');

    const updatedTeamMembers = [...project.teamMembers, member];
    await updateProject(projectId, { teamMembers: updatedTeamMembers });
  } catch (error: any) {
    console.error('Error adding team member:', error);
    throw new Error(error.message || 'Failed to add team member');
  }
};

/**
 * Remove team member from project
 */
export const removeTeamMember = async (
  projectId: string,
  memberId: string
): Promise<void> => {
  try {
    const project = await getProject(projectId);
    if (!project) throw new Error('Project not found');

    const updatedTeamMembers = project.teamMembers.filter((m) => m.id !== memberId);
    
    // Also remove all task assignments for this member
    const updatedAssignments = { ...project.taskAssignments };
    Object.keys(updatedAssignments).forEach((taskId) => {
      updatedAssignments[taskId] = updatedAssignments[taskId].filter(
        (id) => id !== memberId
      );
    });

    await updateProject(projectId, {
      teamMembers: updatedTeamMembers,
      taskAssignments: updatedAssignments,
    });
  } catch (error: any) {
    console.error('Error removing team member:', error);
    throw new Error(error.message || 'Failed to remove team member');
  }
};

/**
 * Assign task to team member
 */
export const assignTask = async (
  projectId: string,
  taskId: string,
  memberId: string
): Promise<void> => {
  try {
    const project = await getProject(projectId);
    if (!project) throw new Error('Project not found');

    const updatedAssignments = { ...project.taskAssignments };
    const currentAssignments = updatedAssignments[taskId] || [];
    
    if (!currentAssignments.includes(memberId)) {
      updatedAssignments[taskId] = [...currentAssignments, memberId];
      await updateProject(projectId, { taskAssignments: updatedAssignments });
    }
  } catch (error: any) {
    console.error('Error assigning task:', error);
    throw new Error(error.message || 'Failed to assign task');
  }
};

/**
 * Unassign task from team member
 */
export const unassignTask = async (
  projectId: string,
  taskId: string,
  memberId: string
): Promise<void> => {
  try {
    const project = await getProject(projectId);
    if (!project) throw new Error('Project not found');

    const updatedAssignments = { ...project.taskAssignments };
    const currentAssignments = updatedAssignments[taskId] || [];
    
    updatedAssignments[taskId] = currentAssignments.filter((id) => id !== memberId);
    await updateProject(projectId, { taskAssignments: updatedAssignments });
  } catch (error: any) {
    console.error('Error unassigning task:', error);
    throw new Error(error.message || 'Failed to unassign task');
  }
};

