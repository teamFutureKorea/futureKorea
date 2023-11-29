package FutureKorea.FutureKorea.gpt.repository;

import FutureKorea.FutureKorea.gpt.domain.Keyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface KeywordRepository extends JpaRepository<Keyword, Long> {
    boolean existsById(Long id);
//    @Query(value = "select kw.keyword from Keyword kw where (kw.report = :columnNo)")
    List<Keyword> findByReportId(@Param("columnId") Long columnId);
}