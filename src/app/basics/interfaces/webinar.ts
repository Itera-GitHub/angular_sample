import { TeamMember } from './team-member';
import { WebinarHost } from './webinar-host';

export interface Webinar {
  is_published: boolean;
  is_active: boolean;
  id: number;
  webinar_id:number,
  title: string;
  sub_title: string;
  short_title: string;
  datetime: string;
  zoom_registration_link: string;
  zoom_webinar_link: string;
  agenda_overview: string;
	access_link: string;
	duration_min: number;
  main_host?: TeamMember;
  description: string;
	tags?: string[];
	agendas?: string[];
  created_at: string;
  updated_at: string;
  youtube_video_id: string;
  youtube_video_preview_path: string;
	country: string;
  meta_description: string;
  meta_title: string;
	active_languages: string[];
	target_groups?: any[];
	languages?: any[];
	hosts?: WebinarHost[];
}
