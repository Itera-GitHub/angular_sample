import {University} from './university';
import {CityHighlight} from './city-highlight';
import { UniversityRanking } from './university-ranking';

export interface City {
  search_code: string;
  id:    number;
  city_id?: number;
  name_en:  string;
  name_ge:  string;
  logo_path?:  string;
  licence_link?:  string;
  foundation_year?:  string;
  licence_type?:  string;
  source_text?:  string;
  avatar_path?: string;
  avatar_thumb_path?: string;
  location_link?:  string;
  location?:  {lat: number, lng: number};
  country?:  string;
  population?:  number;
  federal_state_id?:  number;
  federal_state_name?:  string;
  population_rounded?:  number;
  is_program_location?:  number;
  is_biggest_city:  number;
  date_reference?:  string;
  source?:  string;
  city_name?:  string;
  universities_count:  number;
  gallery?:  any;
  universities?: any[];
  highlights?: CityHighlight[];
  created_at:  string;
  updated_at:  string;
  application_at_university_percent:  string;
  application_at_uni_assist_percent:  string;
  without_admission_restriction_percent:  string;
  local_admission_restriction_percent:  string;
  national_admission_restriction_percent:  string;
  no_admission_restriction:  string;
  beginnings: {
    winter_semester_beginning_percent:  string;
    summer_semester_beginning_percent:  string;
    both_semester_beginning_percent:  string;
    no_semester_beginning_percent:  number;
  };
  application_winter_min: string;
  application_winter_max: string;
  application_summer_min: string;
  application_summer_max: string;
  programs_winter_still_open: string;
  programs_summer_still_open: string;
  programs_open_for_next_intake: string;
  duration: {
    max: number;
    min: number;
    blocks_count: number;
  };
  degrees: string;
  next_intake: string;
  programs_count: number;
  tuition_min:    number;
  tuition_max:    number;
  tuition_min_programs_count_eu:    number;
  tuition_min_programs_count_non_eu:    number;
  tuition_max_programs_count_eu:    number;
  tuition_max_programs_count_non_eu:    number;
  cambridge_min_max_required: {
    max:  string;
    min:  string;
  },
  ielts_min_max_required: {
    max:  string;
    min:  string;
  },
  toefl_min_max_required: {
    max:  string;
    min:  string;
  },

  cambridge_min_count;
  cambridge_max_count;
  ielts_min_count;
  ielts_max_count;
  toefl_min_count;
  toefl_max_count;

  universities_national_ranking: {
    name: string; universities: UniversityRanking[]
  }[];
  international_ranking_program_count: number;
	universities_international_ranking_count: number;
  universities_international_ranking: {
    ranking_description?:  string;
    rank_filter?:  string;
    name: string;
    universities: UniversityRanking[]
  }[];
  no_fee_eu: number;
  no_fee_non_eu: number;
  up_to_1500: number;
  up_to_3000: number;
  up_to_5000: number;
  more_then_5000: number;
  code: string;
}
